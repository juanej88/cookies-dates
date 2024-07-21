// import { useState } from 'react';
import '../assets/styles/Main.css';
// import useConsoleLog from '../assets/helper_functions/useConsoleLog';

const Main = props => {
  const today = new Date();
  const thisYear = today.getFullYear();
  const dateFormat = {weekday: 'short', day: '2-digit', month: 'short'};

  const getEvents = day => {
    return day.map(event => {
      let eventDate = new Date(event.date).setFullYear(thisYear);
      if (event.year > thisYear) eventDate = new Date(event.date)
      else if (eventDate < today) eventDate = new Date(event.date).setFullYear(thisYear + 1);
      const formattedDate = new Date(eventDate).toLocaleDateString(undefined, dateFormat);
      return (
        <aside key={event.id} className={`event-card ${event.event}`}>
          <p>{formattedDate}</p>
          <p>{event.name}</p>
        </aside>
      );
    });
  };

  const getDays = (year, month, days) => {
    return days.map(day => {
      return getEvents(props.eventsObj[year][month][day]);
    });
  };

  const getMonths = (year, months) => {
    return months.map(month => {
      const days = Object.keys(props.eventsObj[year][month]);
      const firstDate = props.eventsObj[year][month][days[0]][0]['date'];
      const monthText = new Date(firstDate).toLocaleDateString(undefined, {month: 'long'});
      return (
        <article key={year + month} className='month-events'>
          <h2>{monthText}</h2>
          {getDays(year, month, days)}
        </article>
      );
    });
  };

  const yearsArr = Object.keys(props.eventsObj);
  const getYears = yearsArr.map(year => {

    // CHECK !!
    // -> I need to check the edge case when a user enters a birthday without a year
    // CHECK !!

    const title = Number(year) === thisYear ? 'Upcoming Events' : year;
    const months = Object.keys(props.eventsObj[year]);
    return (
      <section key={year} className='events-section'>
        <h1>{title}</h1>
        {getMonths(year, months)}
      </section>
    )
  })

  return (
    <main className='events'>
      {getYears}
    </main>
  );
};

export default Main;
