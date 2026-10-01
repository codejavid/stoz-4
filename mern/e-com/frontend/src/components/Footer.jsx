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
    <footer className="mt-24 border-t border-gray-100 bg-white">
      <div className="overflow-hidden border-b border-gray-100 py-2.5">
        <div className="marquee-track flex w-max gap-10 text-xs font-medium tracking-widest text-gray-400 uppercase">
          {marquee.map((item, i) => (
            <span key={`${item}-${i}`}>{item} ·</span>
          ))}
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3 md:px-8">
        <div>
          <p className="text-xl font-bold text-blue-600">AETHER</p>
          <p className="mt-3 max-w-xs text-sm text-gray-400">
            A house of considered garments and objects. Established for the
            quietly obsessive.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs font-semibold tracking-widest text-gray-900 uppercase">Visit</p>
          <p className="text-gray-400">Studio 04, Chennai</p>
          <p className="text-gray-400">By appointment</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs font-semibold tracking-widest text-gray-900 uppercase">Help</p>
          <p className="text-gray-400">Shipping · Returns · Repairs</p>
          <p className="text-gray-400">hello@aether.studio</p>
        </div>
      </div>
      <div className="border-t border-gray-100 px-5 py-4 md:px-8">
        <p className="text-xs text-gray-300">© 2026 Aether. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
