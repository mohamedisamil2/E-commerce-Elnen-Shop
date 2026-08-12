
function Hero() {
  return (
      <section className="relative overflow-hidden text-xl md:text-2xl font-semibold bg-linear-to-r
      from-green-500 via-green-900 to-green-300 rounded-tl-2xl rounded-tr-full px-8 py-16 md:px-16 md:py-24">
      <div className="relative z-10 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-300">
          El Nene Shop
        </p>

        <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
          Find Something
          <span className="block text-emerald-300">You’ll Love.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-gray-200 md:text-lg">
          Discover our latest products, featured deals and everything you need
          in one place.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 ">
          <button className="rounded-lg bg-emerald-400 px-6 py-3 font-semibold text-emerald-950 transition hover:bg-emerald-300">
            Shop Now
          </button>

          <button className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20">
            Explore Categories
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero
