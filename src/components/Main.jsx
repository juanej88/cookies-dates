// import { useState } from 'react';
import { useEffect } from 'react';
import '../assets/styles/Main.css';
import Modal from './Modal';
// import useConsoleLog from '../assets/helper_functions/useConsoleLog';

const Main = props => {
  const today = new Date();
  const thisYear = today.getFullYear();
  const dateFormat = {weekday: 'short', day: '2-digit'};

  const getEvents = day => {
    return day.map(event => {
      let eventDate = new Date(event.date).setFullYear(thisYear);
      if (event.year > thisYear) eventDate = new Date(event.date)
      else if (eventDate < today) eventDate = new Date(event.date).setFullYear(thisYear + 1);
      const formattedDate = new Date(eventDate).toLocaleDateString(undefined, dateFormat);
      const [weekday, dayNum] = formattedDate.split(' ');
      return (
        // -----------------      ATTENTION       ------------------------
        // I need to toggle the event.new to false after 2.1 seconds!!
        // -----------------      ATTENTION       ------------------------
        <aside key={event.id} className={`event-card ${event.event}`} id={`${event.new ? 'newEvent' : ''}`}>
          <div className='date-container'>
            <p>{weekday.toUpperCase()}</p>
            <p>{dayNum}</p>
          </div>
          <div className='event-container'>
            <p>{event.name}</p>
            <span className='material-symbols-outlined'>
              more_vert
            </span>
          </div>
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
    );
  });

  // it scrolls to an event which has been created on the add Event form and centers it to the screen height
  useEffect(() => {
    const newEvent = document.getElementById('newEvent');
    const windowHeight = window.innerHeight;
    if(newEvent) {
      window.scrollTo({
        // 36px is half of the newEvent height
        top: newEvent.offsetTop + 36 - (windowHeight / 2),
      });
      // it removes the id newEvent after the animation has concluded (2.1s)  so the id can be used for future new events
      const timeOutId = setTimeout(() => {
        newEvent.removeAttribute('id');
      }, 2100);

      return () => clearTimeout(timeOutId);
    };
  }, [props.eventsObj]);

  return (
    <main className='events'>
      {getYears}
      {
        props.modal && 
        <Modal
          toggleModal={props.toggleModal} 
          handleForm={props.handleForm}
          formData={props.formData}
          setFormData={props.setFormData}
        />
      }
    </main>
  );
};

export default Main;
