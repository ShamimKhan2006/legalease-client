import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-forground px-6">
      <div className="text-center">
        
        <h1 className="text-8xl font-extrabold text-indigo-500 animate-pulse">
          404
        </h1>

        <h2 className="text-3xl md:text-5xl font-bold mt-4 text-white">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-400 mt-4 max-w-md mx-auto">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:scale-105 duration-300 shadow-lg"
          >
            Go Home
          </Link>

          <button
      
            className="px-6 py-3 rounded-2xl border border-gray-700 hover:bg-gray-900 duration-300 text-white"
          >
            Go Back
          </button>
        </div>

        <div className="mt-12">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            alt="404"
            width={200}
            height={200}
            className="w-40 mx-auto animate-bounce"
          />
        </div>
      </div>
    </div>
  );
}
