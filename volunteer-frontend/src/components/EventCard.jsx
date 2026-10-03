import { signupForEvent } from "../api";


function EventCard({ event, onSignup }) {

  async function handleSignup() {

    try {

      await signupForEvent(event._id);

      alert("Successfully signed up!");

      onSignup();

    } catch (error) {

      alert(error.message);

    }

  }


  const start = new Date(event.startTime);
  const end = new Date(event.endTime);


  return (

    <article className="event-card">

      <div className="event-top">

        <span className="event-tag">
          COMMUNITY
        </span>

        <span className="event-arrow">
          ↗
        </span>

      </div>


      <h3>
        {event.title}
      </h3>


      <p className="event-description">
        {event.description}
      </p>


      <div className="event-details">

        <div>
          <span>DATE</span>
          {start.toLocaleDateString()}
        </div>

        <div>
          <span>TIME</span>
          {start.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        <div>
          <span>LOCATION</span>
          {event.location}
        </div>

      </div>


      <button
        className="event-button"
        onClick={handleSignup}
      >
        Join event →
      </button>

    </article>

  );
}


export default EventCard;