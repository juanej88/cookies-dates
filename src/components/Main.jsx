import '../assets/styles/Main.css';
import ActionButtons from './ActionButtons';
// import useConsoleLog from '../assets/helper_functions/useConsoleLog';
// import { useState, useEffect } from 'react';

const Main = () => {
  // const [events, setEvents] = useState([]);
  // const [today] = useState({date: new Date().getTime(), year: new Date().getFullYear()});
  // useConsoleLog(events); // custom hook

  // const eventCards = events.sort((a, b) => {  
  //   const eventA = new Date(a.dob.date);
  //   eventA.setFullYear(today.year);
  //   const eventB = new Date(b.dob.date)
  //   eventB.setFullYear(today.year);

  //   // if the event has passed on the current year, it displays it next year
  //   if (eventA < today.date) eventA.setFullYear(today.year + 1);
  //   if (eventB < today.date) eventB.setFullYear(today.year + 1);
    
  //   return eventA - eventB;
  // }).map(event => {
  //   const eventType = `${event.type === 'event' ? 'event' : 'birthday'}`;
  //   const options = {weekday: 'short', day: '2-digit', month: 'short'};
  //   const originalDate = new Date(event.dob.date);
  //   // if the event has passed on the current year, it displays it next year
  //   originalDate.setFullYear(today.year);
  //   if (originalDate < today.date) originalDate.setFullYear(today.year + 1);
  //   const eventDate = new Date(originalDate).toLocaleString(undefined, options);

  //   return (
  //     <div key={event.id.value} className={`event-card ${eventType}`}>
  //       <p>{eventDate}</p>
  //       <h2>{event.name.first} {event.name.last}</h2>
  //     </div>
  //   );
  // });

  // const fetchData = () => {
  //   const parameters = 'nat=au&page=4&results=10&seed=abc&inc=id,name,dob';
  //   fetch(`https://randomuser.me/api/?${parameters}`)
  //     .then(response => response.json())
  //     .then(data => setEvents(data.results))
  //     .catch(e => console.log(e));
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <main className='events'>
      <section id='upcoming-events'>
        <h1>Upcoming Events</h1>

        <article className='month-events'>
          <h2>July</h2>
          <aside className='event-card special'>
            <p>Mon, 03 Jul</p>
            <p>John's BBQ</p>
          </aside>
        </article>

        <article className='month-events'>
          <h2>August</h2>
          <aside className='event-card birthday'>
            <p>Thu, 15 Aug</p>
            <p>Aaron Sullivan</p>
          </aside>
          <aside className='event-card birthday'>
            <p>Sun, 18 Aug</p>
            <p>Elton Muller</p>
          </aside>
        </article>

        <article className='month-events'>
          <h2>November</h2>
          <aside className='event-card birthday'>
            <p>Fri, 01 Nov</p>
            <p>Diane Kelley</p>
          </aside>
          <aside className='event-card special'>
            <p>Fri, 15 Nov</p>
            <p>Wedding Anniversary</p>
          </aside>
          <aside className='event-card birthday'>
            <p>Sat, 16 Nov</p>
            <p>Ana Wells</p>
          </aside>
        </article>
      </section>
        {/* {eventCards} */}
      <ActionButtons />
    </main>
  );
};

export default Main;
