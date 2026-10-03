import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <span className="logo-mark">V</span>
          <span>VolunteerHub</span>
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        {token && (
          <>
            <Link to="/events">Events</Link>
            <Link to="/my-volunteering">My Volunteering</Link>

            {role === "coordinator" && (
              <Link to="/coordinator">Coordinator</Link>
            )}
          </>
        )}
      </div>

      <div className="navbar-actions">
        {!token ? (
          <>
            <Link to="/login" className="login-btn">
              Login
            </Link>

            <Link to="/register" className="register-btn">
              Join Us
            </Link>
          </>
        ) : (
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;