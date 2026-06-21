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
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Legal Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
             href={`/lawyers?category=${cat.name}`}
              className="border rounded-xl p-6 text-center hover:shadow-lg transition"
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