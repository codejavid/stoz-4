const HERO_IMAGE =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80";

const HeroBanner = () => {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-end overflow-hidden pt-36 md:flex-row md:items-stretch md:justify-between md:pt-24">
      <div className="z-10 flex flex-1 flex-col justify-end px-5 pb-16 md:justify-center md:px-10 lg:px-16">
        <p className="text-xs tracking-[0.35em] text-muted uppercase">
          Vol. 04 · 2026
        </p>
        <h1 className="font-display mt-4 max-w-xl text-5xl leading-[0.95] font-semibold tracking-tight md:text-7xl lg:text-8xl">
          Quiet luxury,
          <br />
          loud form.
        </h1>
        <p className="mt-6 max-w-md text-muted">
          An editorial edit of objects made to be worn, held, and kept. The
          season is brief. The silhouette is not.
        </p>
        <a
          href="#shop"
          className="mt-10 inline-flex w-fit items-center gap-3 bg-accent px-6 py-3 text-xs tracking-[0.28em] text-accent-ink uppercase"
        >
          Shop the drop
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
