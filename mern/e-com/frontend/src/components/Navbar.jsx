import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login")
  }
  

  return (
    <nav className="bg-blue-600 text-white shadow-xl">
      <div className="container mx-auto py-3">
        <div className="flex justify-between items-center">
          <Link className="text-2xl font-bold hover:text-blue-300" to="/">
            Ecom store
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/">Product</Link>
            <Link to="/cart">Cart</Link>

            {user ? (
              <>
                {user.isAdmin && (
                  <Link to="/admin">Admin</Link>
                )}
                <span className="text-sm">{user.name}</span>
                <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-300">
                  Logout
                </button>
              </>
            ) : (

                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
