const HERO_IMAGE =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80";

const HeroBanner = () => {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-end overflow-hidden pt-36 md:flex-row md:items-stretch md:justify-between md:pt-24">
      <div className="z-10 flex flex-1 flex-col justify-end px-5 pb-16 md:justify-center md:px-10 lg:px-16">
        <p className="text-xs font-medium tracking-widest text-blue-500 uppercase">
          Vol. 04 · 2026
        </p>
        <h1 className="mt-4 max-w-xl text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
          Quiet luxury,
          <br />
          loud form.
        </h1>
        <p className="mt-5 max-w-md text-gray-500">
          An editorial edit of objects made to be worn, held, and kept. The
          season is brief. The silhouette is not.
        </p>
        <a
          href="#shop"
          className="mt-10 inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Shop the collection
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      <div className="relative h-72 w-full md:h-auto md:w-[46%]">
        <img
          src={HERO_IMAGE}
          alt="Seasonal editorial"
          className="h-full w-full object-cover"
        />
        <div className="absolute right-6 bottom-6 text-xs tracking-widest text-white uppercase drop-shadow">
          Scroll
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
