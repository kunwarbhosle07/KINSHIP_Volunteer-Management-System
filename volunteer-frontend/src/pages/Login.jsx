import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";


function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "coordinator") {
        navigate("/coordinator");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }
  }


  return (

    <div className="auth-page">

      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>

      <div className="auth-layout">

        <div className="auth-intro">

          <div className="brand">
            VOLUNTEER<span>.</span>
          </div>

          <h1>
            Make time
            <br />
            <span>matter.</span>
          </h1>

          <p>
            Find community events, lend your skills,
            and turn a few hours into something meaningful.
          </p>

        </div>


        <div className="auth-card">

          <div className="eyebrow">
            WELCOME BACK
          </div>

          <h2>Sign in</h2>

          <p className="muted">
            Continue where you left off.
          </p>


          {error && (
            <div className="error-box">
              {error}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            <label>Email</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />


            <label>Password</label>

            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />


            <button
              className="primary-button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in →"}
            </button>

          </form>


          <p className="auth-footer">

            Don't have an account?

            <Link to="/register">
              Create one
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}


export default Login;