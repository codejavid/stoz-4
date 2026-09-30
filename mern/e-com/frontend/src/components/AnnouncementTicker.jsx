const phrases = [
  "Complimentary shipping on the seasonal drop",
  "Limited pieces · crafted to linger",
  "New arrivals · Autumn atelier",
];

const AnnouncementTicker = () => {
  const loop = [...phrases, ...phrases];

  return (
    <div className="overflow-hidden border-b border-line py-2 text-[11px] tracking-[0.28em] text-muted uppercase">
      <div className="ticker-track flex w-max gap-12">
        {loop.map((text, i) => (
          <span key={`${text}-${i}`}>{text} —</span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementTicker;
