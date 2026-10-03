import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../api";


function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      await registerUser({
        name,
        email,
        password,
        role,
      });

      navigate("/login");

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
            Show up for
            <br />
            <span>something.</span>
          </h1>

          <p>
            Join events in your community and
            make every hour count.
          </p>

        </div>


        <div className="auth-card">

          <div className="eyebrow">
            GET STARTED
          </div>

          <h2>Create account</h2>

          <p className="muted">
            It only takes a minute.
          </p>


          {error && (
            <div className="error-box">
              {error}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            <label>Full name</label>

            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />


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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />


            <label>I want to join as</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="volunteer">
                Volunteer
              </option>

              <option value="coordinator">
                Coordinator
              </option>

            </select>


            <button
              className="primary-button"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create account →"}
            </button>

          </form>


          <p className="auth-footer">

            Already have an account?

            <Link to="/login">
              Sign in
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}


export default Register;