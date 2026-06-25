import Link from "next/link";

const categories = [
  { name: "Criminal Law", icon: "⚖️" },
  { name: "Corporate Law", icon: "🏢" },
  { name: "Family Law", icon: "👨‍👩‍👧" },
  { name: "Immigration Law", icon: "✈️" },
  { name: "Property Law", icon: "🏠" }
];

const LegalCategories = () => {
  return (
    <section className="bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-8 pt-10 pr-35">
          Legal Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 pb-20">
          {categories.map((cat) => (
            <Link
              key={cat.name}
             href={`/lawyers?category=${cat.name}`}
              className="border rounded-xl p-6 text-center hover:shadow-lg transition text-white"
            >
              <div className="text-3xl">{cat.icon}</div>
              <p className="mt-2 font-semibold">{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegalCategories;