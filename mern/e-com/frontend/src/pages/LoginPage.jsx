import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="hidden flex-col justify-end bg-surface px-12 py-16 md:flex">
        <p className="text-xs tracking-[0.35em] text-muted uppercase">Members</p>
        <p className="font-display mt-4 text-5xl leading-tight">
          Return to the house.
        </p>
      </div>
      <div className="flex items-center px-6 pt-28 pb-16 md:px-16">
        <div className="w-full max-w-md">
          <h1 className="font-display text-4xl">Login</h1>
          {error && (
            <div className="mt-4 border border-accent px-4 py-2 text-sm text-accent">
              {String(error)}
            </div>
          )}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-xs tracking-widest uppercase">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-line bg-transparent px-3 py-3 outline-none focus:border-accent"
                required
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs tracking-widest uppercase">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-line bg-transparent px-3 py-3 outline-none focus:border-accent"
                required
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent py-3 text-xs tracking-[0.28em] text-accent-ink uppercase disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-6 text-sm text-muted">
            Don't have an account?{" "}
            <Link to="/register" className="text-ink underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
