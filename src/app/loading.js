


export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative h-20 w-20">
        <span className="absolute inset-0 rounded-full border-[5px] border-indigo-500 border-t-transparent animate-spin"></span>

        <span
          className="absolute inset-3 rounded-full border-[5px] border-violet-500 border-b-transparent animate-spin"
          style={{
            animationDirection: "reverse",
            animationDuration: "1.2s",
          }}
        ></span>
      </div>
    </div>
  );
}