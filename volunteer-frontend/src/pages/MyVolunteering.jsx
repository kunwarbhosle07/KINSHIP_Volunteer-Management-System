import { useEffect, useState } from "react";

import {
  getMyVolunteering
} from "../api";


function MyVolunteering() {

  const [signups, setSignups] = useState([]);
  const [loading, setLoading] = useState(true);


  async function loadSignups() {

    try {

      const data = await getMyVolunteering();

      setSignups(
        Array.isArray(data)
          ? data
          : data.signups || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {
    loadSignups();
  }, []);


  return (

    <div className="app-shell">

      <main className="dashboard">

        <div className="page-heading">

          <span className="eyebrow">
            YOUR ACTIVITY
          </span>

          <h1>
            My volunteering
          </h1>

          <p>
            Every signup is a small commitment
            to your community.
          </p>

        </div>


        {loading ? (

          <div className="loading">
            Loading...
          </div>

        ) : signups.length === 0 ? (

          <div className="empty-state">

            <h3>
              Nothing here yet.
            </h3>

            <p>
              Sign up for an event and it'll appear here.
            </p>

          </div>

        ) : (

          <div className="signup-list">

            {signups.map((signup) => {

              const event = signup.event;

              if (!event) return null;

              return (

                <div
                  className="signup-row"
                  key={signup._id}
                >

                  <div>

                    <span className="eyebrow">
                      EVENT
                    </span>

                    <h3>
                      {event.title}
                    </h3>

                    <p>
                      {event.location}
                    </p>

                  </div>


                  <div className="signup-date">

                    {new Date(
                      event.startTime
                    ).toLocaleDateString()}

                  </div>


                  <div>

                    {signup.attended ? (

                      <span className="status attended">
                        ✓ Attended
                      </span>

                    ) : (

                      <span className="status upcoming">
                        Upcoming
                      </span>

                    )}

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </main>

    </div>

  );
}


export default MyVolunteering;