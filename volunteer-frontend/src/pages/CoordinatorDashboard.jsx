import { useEffect, useState } from "react";

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  markAttendance
} from "../api";


function CoordinatorDashboard() {

  const [events, setEvents] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);


  const emptyForm = {
    title: "",
    description: "",
    location: "",
    startTime: "",
    endTime: ""
  };


  const [form, setForm] = useState(emptyForm);


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


  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  }


  async function handleSubmit(e) {

    e.preventDefault();

    try {

      if (editingId) {

        await updateEvent(
          editingId,
          form
        );

      } else {

        await createEvent(form);

      }


      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);

      await loadEvents();

    } catch (error) {

      alert(error.message);

    }

  }


  function editEvent(event) {

    setEditingId(event._id);

    setForm({
      title: event.title,
      description: event.description,
      location: event.location,
      startTime: event.startTime.slice(0, 16),
      endTime: event.endTime.slice(0, 16)
    });

    setShowForm(true);

  }


  async function removeEvent(id) {

    const confirmed = window.confirm(
      "Delete this event?"
    );

    if (!confirmed) return;


    try {

      await deleteEvent(id);

      await loadEvents();

    } catch (error) {

      alert(error.message);

    }

  }


  async function attendance(signupId) {

    try {

      await markAttendance(signupId);

      alert("Attendance confirmed.");

      await loadEvents();

    } catch (error) {

      alert(error.message);

    }

  }


  return (

    <div className="app-shell">

      <main className="dashboard">

        <div className="coordinator-header">

          <div>

            <span className="eyebrow">
              COORDINATOR
            </span>

            <h1>
              Manage your events.
            </h1>

          </div>


          <button
            className="primary-button small"
            onClick={() => {

              setEditingId(null);
              setForm(emptyForm);
              setShowForm(true);

            }}
          >
            + Create event
          </button>

        </div>


        {showForm && (

          <div className="event-form-card">

            <div className="form-title">

              <h2>
                {editingId
                  ? "Edit event"
                  : "Create an event"}
              </h2>

            </div>


            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                <div>

                  <label>Title</label>

                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div>

                  <label>Location</label>

                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              <label>Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />


              <div className="form-grid">

                <div>

                  <label>Start time</label>

                  <input
                    type="datetime-local"
                    name="startTime"
                    value={form.startTime}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div>

                  <label>End time</label>

                  <input
                    type="datetime-local"
                    name="endTime"
                    value={form.endTime}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              <div className="form-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button className="primary-button">
                  {editingId
                    ? "Save changes"
                    : "Create event"}
                </button>

              </div>

            </form>

          </div>

        )}


        <section className="manager-section">

          <div className="section-heading">

            <div>

              <span className="eyebrow">
                YOUR EVENTS
              </span>

              <h2>
                Event management
              </h2>

            </div>

          </div>


          {loading ? (

            <div className="loading">
              Loading...
            </div>

          ) : events.length === 0 ? (

            <div className="empty-state">
              <h3>No events created yet.</h3>
            </div>

          ) : (

            <div className="manager-list">

              {events.map((event) => (

                <div
                  className="manager-card"
                  key={event._id}
                >

                  <div className="manager-main">

                    <span className="event-tag">
                      EVENT
                    </span>

                    <h3>
                      {event.title}
                    </h3>

                    <p>
                      {event.description}
                    </p>

                    <div className="manager-meta">

                      <span>
                        📍 {event.location}
                      </span>

                      <span>
                        🗓️{" "}
                        {new Date(
                          event.startTime
                        ).toLocaleDateString()}
                      </span>

                    </div>

                  </div>


                  <div className="manager-actions">

                    <button
                      onClick={() => editEvent(event)}
                      className="secondary-button"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        removeEvent(event._id)
                      }
                      className="danger-button"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>

  );
}


export default CoordinatorDashboard;