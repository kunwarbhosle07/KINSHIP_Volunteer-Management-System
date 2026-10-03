import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getEvents } from "../api";
import EventCard from "../components/EventCard";


function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);


  async function loadEvents() {

    try {

      const data = await getEvents();

      setEvents(
        Array.isArray(data)
          ? data
          : data.events || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {
    loadEvents();
  }, []);


  function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  }


  return (

    <div className="app-shell">

      <nav className="navbar">

        <div className="brand">
          VOLUNTEER<span>.</span>
        </div>


        <div className="nav-links">

          <Link to="/dashboard">
            Events
          </Link>

          <Link to="/my-volunteering">
            My volunteering
          </Link>

          {user?.role === "coordinator" && (
            <Link to="/coordinator">
              Coordinator
            </Link>
          )}

        </div>


        <div className="user-area">

          <span>
            {user?.name}
          </span>

          <button
            onClick={logout}
            className="logout-button"
          >
            Logout
          </button>

        </div>

      </nav>


      <main className="dashboard">

        <section className="hero">

          <div>

            <div className="eyebrow">
              COMMUNITY EVENTS
            </div>

            <h1>
              Find something
              <br />
              <span>worth showing up for.</span>
            </h1>

            <p>
              Discover events happening around your
              community and lend a hand.
            </p>

          </div>

        </section>


        <section>

          <div className="section-heading">

            <div>
              <span className="eyebrow">
                UPCOMING
              </span>

              <h2>
                Events near you
              </h2>
            </div>

            <span className="event-count">
              {events.length} events
            </span>

          </div>


          {loading ? (

            <div className="loading">
              Loading events...
            </div>

          ) : events.length === 0 ? (

            <div className="empty-state">
              <h3>No events yet.</h3>
              <p>
                Check back soon for new opportunities.
              </p>
            </div>

          ) : (

            <div className="events-grid">

              {events.map((event) => (

                <EventCard
                  key={event._id}
                  event={event}
                  onSignup={loadEvents}
                />

              ))}

            </div>

          )}

        </section>

      </main>

    </div>

  );
}


export default Dashboard;