const Footer = () => {
  const marquee = [
    "Outerwear",
    "Atelier",
    "Fragrance",
    "Objects",
    "Essentials",
    "Outerwear",
    "Atelier",
    "Fragrance",
    "Objects",
    "Essentials",
  ];

  return (
    <footer className="mt-24 border-t border-line">
      <div className="overflow-hidden border-b border-line py-3">
        <div className="marquee-track flex w-max gap-10 text-sm tracking-[0.3em] uppercase">
          {marquee.map((item, i) => (
            <span key={`${item}-${i}`}>{item} ·</span>
          ))}
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-3xl">AETHER</p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            A house of considered garments and objects. Established for the
            quietly obsessive.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 tracking-widest uppercase">Visit</p>
          <p className="text-muted">Studio 04, Chennai</p>
          <p className="text-muted">By appointment</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 tracking-widest uppercase">Care</p>
          <p className="text-muted">Shipping · Returns · Repairs</p>
          <p className="text-muted">hello@aether.studio</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
