import { useState, useEffect } from 'react';
import '../assets/styles/Main.css';
import GetStarted from './GetStarted';
import Modal from './Modal';
import EventForm from './EventForm';
import DeleteEvent from './DeleteEvent';
import CreateMessage from './CreateMessage';
import Event from './Event';

const Main = props => {
  const today = new Date();
  const thisYear = today.getFullYear();
  const dateFormat = {day: '2-digit', month: 'short'};

  const [currentNode, setCurrentNode] = useState(undefined);

  const openMoreOptions = event => {
    let targetNode = event.target.parentNode.id === 'more-options-btn' ? event.target.parentNode : undefined
    if(!targetNode) return;

    // this removes the class close-more-options if it was clicked before to allow to play the class open-more-options animation
    if (targetNode.className.split(' ').indexOf('close-more-options') !== -1) targetNode.classList.remove('close-more-options');

    // this opens the options menu or closes it if it's clicked again
    if(targetNode !== currentNode) {
      // this closes the previous menu (if it was left open) when clicking another event card
      if(currentNode) {
        currentNode.classList.remove('open-more-options');
        currentNode.classList.add('close-more-options');
      };
      targetNode.classList.add('open-more-options');
      setCurrentNode(targetNode);
    } else {
      currentNode.classList.remove('open-more-options');
      currentNode.classList.add('close-more-options');
      setCurrentNode(undefined);
    };
  };

  // closes the more-options menu when clicking anywhere else
  useEffect(() => {
    const closeMoreOptions = event => {
      if (event.target.parentNode.id !== 'more-options-btn') {
        currentNode.classList.remove('open-more-options');
        currentNode.classList.add('close-more-options');
        setCurrentNode(undefined);
      };
    };
    if (currentNode) window.addEventListener('click', closeMoreOptions);
    return () => window.removeEventListener('click', closeMoreOptions);
  }, [currentNode]);

  const getEvents = day => {
    return day.map(event => {
      let eventDate = new Date(event.date).setFullYear(thisYear);
      if (event.year > thisYear) eventDate = new Date(event.date)
      else if (eventDate < today) eventDate = new Date(event.date).setFullYear(thisYear + 1);
      const formattedDate = new Date(eventDate).toLocaleDateString(undefined, dateFormat);
      return (
        // -----------------      ATTENTION       ------------------------
        // I need to toggle the event.show to false after 0.3 seconds!!
        // -----------------      ATTENTION       ------------------------
          <Event key={event.id} event={event.event_type} show={event.show} name={event.name} date={formattedDate} currentNode={currentNode} setCurrentNode={setCurrentNode} updateModal={props.updateModal} openMoreOptions={openMoreOptions} data={event}></Event>
      );
    });
  };

  const getDays = (year, month, days) => {
    return days.map(day => {
      return getEvents(props.userEvents[year][month][day]);
    });
  };

  const getMonths = (year, months) => {
    return months.map(month => {
      const days = Object.keys(props.userEvents[year][month]);
      const firstDate = props.userEvents[year][month][days[0]][0]['date'];
      const monthText = new Date(firstDate).toLocaleDateString(undefined, {month: 'long'});
      return (
        <article key={`${year}${month}`} className='month-events'>
          <h2>{monthText}</h2>
          {getDays(year, month, days)}
        </article>
      );
    });
  };

  const yearsArr = Object.keys(props.userEvents);
  const getYears = yearsArr.map(year => {
    const title = Number(year) === thisYear ? 'Upcoming Events' : year;
    const months = Object.keys(props.userEvents[year]);
    return (
      <section key={year} className='events-section'>
        <h1>{title}</h1>
        {getMonths(year, months)}
      </section>
    );
  });

  // it scrolls to an event which has been created and updated, and centers it to the screen height
  useEffect(() => {
    const showEvent = document.getElementsByClassName('show-event')[0];
    const windowHeight = window.innerHeight;
    if(showEvent) {
      window.scrollTo({
        // 36px is half of the showEvent height
        top: showEvent.offsetTop + 36 - (windowHeight / 2),
      });
      // it removes the class show-event after the animation has concluded (0.3s) so the class can be reused for future show events
      const timeOutId = setTimeout(() => {
        showEvent.classList.remove('show-event');
      }, 300);
      return () => clearTimeout(timeOutId);
    };
  }, [props.userEvents]);

  return (
    <main className='events'>
      {getYears}
      {Object.keys(props.userEvents).length === 0 && 
        <GetStarted updateModal={props.updateModal} />
      }
      {props.modal.show && 
        <Modal updateModal={props.updateModal} eventID={props.modal.type}>
          {props.modal.type === 'add-event' &&
          <EventForm handleForm={props.handleForm} formData={props.formData}setFormData={props.setFormData} btnTag={'Add'} type={'add'} />
          }
          {props.modal.type === 'update-event' &&
          <EventForm handleForm={props.handleForm} formData={props.formData}setFormData={props.setFormData} btnTag={'Update'} type={'update'} />
          }
          {props.modal.type === 'delete-event' &&
          <DeleteEvent data={props.formData} deleteEvent={props.deleteEvent} />
          }
          {props.modal.type === 'create-message' &&
          <CreateMessage data={props.formData} user={props.user} updateUser={props.updateUser} updatePreviousMessage={props.updatePreviousMessage} />
          }
        </Modal>
      }
    </main>
  );
};

export default Main;