import '../assets/styles/Main.css';
import {events} from '../assets/data/data';

const Main = () => {
  const options = {weekday: 'short', day: '2-digit', month: 'short'};

  const eventCards = events.sort((a, b) => a.date - b.date)
  .map(event => {
    const eventDate = new Date(event.date).toLocaleString(undefined, options);
    const eventType = `${event.type === 'event' ? 'event' : 'birthday'}`;
    return (
      <div key={event.id} className={`event-card ${eventType}`}>
        <h2>{event.name}</h2>
        <p>{eventDate}</p>
      </div>
    );
  });

  return (
    <main>
      <section className='events'>
        <h1>Upcoming Events:</h1>
        {eventCards}
      </section>
    </main>
  );
};

export default Main;
