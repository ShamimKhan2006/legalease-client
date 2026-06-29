
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 9;

const LawyersClient = ({ lawyers }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const cats = lawyers.map((l) => l.specialization).filter(Boolean);
    return ["All", ...new Set(cats)];
  }, [lawyers]);

  const filteredLawyers = useMemo(() => {
    return lawyers.filter((lawyer) => {
      const matchesSearch = lawyer.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        lawyer.specialization === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [lawyers, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredLawyers.length / ITEMS_PER_PAGE);

  const paginatedLawyers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredLawyers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredLawyers, currentPage]);

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter(
        (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
      )
      .reduce((acc, p, idx, arr) => {
        if (idx > 0 && p - arr[idx - 1] > 1) acc.push("ellipsis-" + p);
        acc.push(p);
        return acc;
      }, []);
  }, [totalPages, currentPage]);

  return (
    <>
      {/* Search + Filter Bar */}
      <div className=" md:flex-row gap-4 mb-14 ">
        <div className="relative">
          <Search
            size={16}
            className="absolute top-6 left-4 -translate-y-1/2 text-blue-400"
          />
          <input
            type="text"
            placeholder="Search by lawyer name..."
            value={searchQuery}
            onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
            className="w-full mb-5 bg-gray-900/60 border border-gray-800 rounded-2xl pl-11 pr-5 py-3.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
          
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(setSelectedCategory, cat)}
              className={`px-4 py-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-blue-500/15 border-blue-500/50 text-blue-400"
                  : "bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      {(searchQuery || selectedCategory !== "All") && (
        <p className="text-gray-500 text-sm mb-8 -mt-8">
          {filteredLawyers.length} lawyer
          {filteredLawyers.length !== 1 ? "s" : ""} found
          {searchQuery && (
            <span className="text-gray-600"> for `{searchQuery}`</span>
          )}
          {selectedCategory !== "All" && (
            <span className="text-gray-600"> in {selectedCategory}</span>
          )}
        </p>
      )}

      {/* Lawyers Grid */}
      {filteredLawyers.length === 0 ? (
        <div className="flex flex-col items-center py-24 gap-4">
          <p className="text-gray-500 text-lg">No lawyers found.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setCurrentPage(1);
            }}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedLawyers.map((lawyer) => (
              <div
                key={lawyer._id}
                className="relative p-[1px] rounded-[30px] bg-gradient-to-b from-gray-800 to-transparent group overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-500/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative bg-[#0a0a0a] p-8 rounded-[30px] h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20" />
                      <Image
                        width={120}
                        height={120}
                        src={lawyer.image}
                        alt={lawyer.name}
                        className="relative rounded-full object-cover border-2 border-gray-800"
                      />
                      <div
                        className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-4 border-[#0a0a0a] ${
                          lawyer.isBusy ? "bg-red-500" : "bg-green-500"
                        }`}
                      />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2">
                      {lawyer.name}
                    </h2>
                    <div className="inline-block px-4 py-1 mb-6 rounded-full border border-gray-800 bg-gray-900 text-gray-400 text-xs uppercase tracking-widest font-semibold">
                      {lawyer.specialization}
                    </div>

                    <div className="w-full flex justify-between items-center px-4 py-3 bg-gray-900/50 rounded-2xl mb-6">
                      <span className="text-gray-500 text-sm">Hourly Rate</span>
                      <span className="text-white font-bold text-lg">
                        ${lawyer.hourlyRate}
                      </span>
                    </div>

                    <Link href={`/lawyers/${lawyer._id}`} className="w-full">
                      <button className="w-full py-4 rounded-2xl border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all duration-300">
                        View Dossier
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex flex-col items-center gap-4">
              <p className="text-gray-500 text-sm">
                Showing{" "}
                <span className="text-white font-medium">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    filteredLawyers.length
                  )}
                </span>{" "}
                of{" "}
                <span className="text-white font-medium">
                  {filteredLawyers.length}
                </span>{" "}
                lawyers
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:border-blue-500/50 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:text-gray-400"
                >
                  <ChevronLeft size={16} />
                  Prev
                </button>

                {pageNumbers.map((item) =>
                  String(item).startsWith("ellipsis") ? (
                    <span key={item} className="text-gray-600 px-1 text-sm">
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => goToPage(item)}
                      className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        item === currentPage
                          ? "bg-blue-500/15 border border-blue-500/50 text-blue-400"
                          : "border border-white/10 text-gray-400 hover:border-blue-500/50 hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:border-blue-500/50 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:text-gray-400"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LawyersClient;