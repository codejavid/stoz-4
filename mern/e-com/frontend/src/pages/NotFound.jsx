import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-36 pb-24 text-center">
      <p className="text-xs tracking-[0.3em] text-muted uppercase">404</p>
      <h1 className="font-display mt-4 text-6xl md:text-8xl">Lost in the house</h1>
      <p className="mt-6 text-muted">This room does not exist in the archive.</p>
      <Link
        to="/"
        className="mt-10 inline-block border-b border-accent pb-1 text-sm tracking-widest uppercase"
      >
        Return home
      </Link>
    </div>
  );
};

export default NotFound;
