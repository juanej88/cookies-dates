import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import futureEvents from './assets/helper_functions/futureEvents';

const App = () => {
  const [eventsObj, setEventsObj] = useState(futureEvents);

  const createEventFromYear = (year, month, day, event) => {
    setEventsObj(prevState => {
      return {
        ...prevState,
        [year]: {[month]: {[day]: [{...event, displayYear: year}]}},
      };
    });
  };

  const createEventFromMonth = (year, month, day, event) => {
    setEventsObj(prevState => {
      return {
        ...prevState,
        [year]: {
          ...prevState[year],
          [month]: {[day]: [{...event, displayYear: year}]},
        },
      };
    });
  };

  const createEventFromDay = (year, month, day, event) => {
    setEventsObj(prevState => {
      return {
        ...prevState,
        [year]: {
          ...prevState[year],
          [month]: {
            ...prevState[year][month],
            [day]: [{...event, displayYear: year}]
          },
        },
      };
    });
  };

  const createEventOnly = (year, month, day, event) => {
    setEventsObj(prevState => {
      return {
        ...prevState,
        [year]: {
          ...prevState[year],
          [month]: {
            ...prevState[year][month],
            [day]: [
              ...prevState[year][month][day],
              {...event, displayYear: year}
            ],
          },
        },
      };
    });
  };

  const checkEventObj = (year, month, day, event) => {
    if(!(year in eventsObj)) {
      createEventFromYear(year, month, day, event);
    } else if(!(month in eventsObj[year])) {
      createEventFromMonth(year, month, day, event);
    } else if(!(day in eventsObj[year][month])) {
      createEventFromDay(year, month, day, event);
    } else {
      createEventOnly(year, month, day, event);
    };
  };
  
  const checkYear = data => {
    // newDate gets formatted to pass the first second of the current day to the today variable so it can add the events which are on the current day to the top of the Upcoming Events
    const newDate = new Date().toLocaleDateString(undefined, {day: '2-digit', month: 'short',  year:'numeric'});
    const today = new Date(newDate);
    const thisYear = today.getFullYear();

    data.events.forEach(event => {
      let eventDate = new Date(event.date).setFullYear(thisYear);
      if (event.year > thisYear) {
        // pass data as it is if the event is in the upcoming years
        checkEventObj(event.year, event.month, event.day, event);
      } else if (eventDate >= today) {
        // pass thisYear for the events which haven't passed
        checkEventObj(thisYear, event.month, event.day, event);
      } else {
        // pass next year for the events that have passed
        checkEventObj(thisYear + 1, event.month, event.day, event);
      };
    });
  };

  const [formData, setFormData] = useState({
    id: 99, // I need to remove it once it's sent to the back-end
    event: 'birthday',
    name: '',
    dateInput: '',
    day: '',
    month: '',
    year: '',
    date: '',
    new: true,
  });

  const saveDate = event => {
    event.preventDefault();
    const newDate = {events: [formData]};
    checkYear(newDate);

    setFormData({
      // I need to remove it once it's sent to the back-end 
      // and generate a random number
      id: 100,
      event: 'birthday',
      name: '',
      dateInput: '',
      day: '',
      month: '',
      year: '',
      date: '',
      new: true,
    });
    updateModal();
  };

  // deleteEl gets updated with the functions updateModal when a user wants to delete an event, then it's used to add an animation if it's indeed deleted
  const [deletedEl, setDeletedEl] = useState(undefined);

  // -- This section updates the modal status according to the clicked source --
  const [modal, setModal] = useState({show: false, type: ''});
  const updateModal = (event, data) => {
    const eventID = !event ? undefined
    : event.target.id ? event.target.id 
    : event.target.parentNode.id;

    // it gets the event-card data to update and delete events, else, it blanks the form to add event
    if (data) {
      const formattedDate = data.date.split('-').reverse().join('/');
      data.dateInput = formattedDate;
      setFormData(data);
    } else setFormData({
      id: 99, // I need to remove it once it's sent to the back-end
      event: 'birthday',
      name: '',
      dateInput: '',
      day: '',
      month: '',
      year: '',
      date: '',
      new: true,
    });
    
    setModal(() => {
      switch(eventID) {
        case 'add-event':
        case 'update-event':
        case 'delete-event':
          return {show: true, type: eventID};
        default:
          return {show: false, type: ''};
      };
    });

    if(eventID === 'delete-event') {
      setDeletedEl(event.target.parentNode.parentNode.parentNode);
    } else {
      setDeletedEl(undefined);
    };
  };

  // -- Start: Delete Event --
  const [eventToDelete, setEventToDelete] = useState(false);
  const deleteEvent = eventData => {
    const { day, month, displayYear } = eventData;
    // the conditions will add the class delete-animation to the correct DOM element
    if (eventsObj[displayYear][month][day].length > 1) {
      deletedEl.classList.add('delete-animation');
    } else if (Object.keys(eventsObj[displayYear][month]).length > 1) {
      deletedEl.classList.add('delete-animation');
    } else if (Object.keys(eventsObj[displayYear]).length > 1) {
      deletedEl.parentNode.classList.add('delete-animation');
    } else {
      deletedEl.parentNode.parentNode.classList.add('delete-animation');
    };
    updateModal();
    setEventToDelete(eventData);
  };

  // it deletes the event from eventsObj after 0.3s once the animation is done
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if(eventToDelete) {
        const { id, day, month, displayYear } = eventToDelete;
        if (eventsObj[displayYear][month][day].length > 1) {
          const idx = eventsObj[displayYear][month][day].findIndex(event => event.id === id);
          // delete event in the array day
          setEventsObj(prevState => {
            prevState[displayYear][month][day].splice(idx, 1);
            return prevState;
          });
        } else if (Object.keys(eventsObj[displayYear][month]).length > 1) {
          // delete event and day
          setEventsObj(prevState => {
            delete prevState[displayYear][month][day];
            return prevState;
          });
        } else if (Object.keys(eventsObj[displayYear]).length > 1) {
          // delete event, day and month
          setEventsObj(prevState => {
            delete prevState[displayYear][month];
            return prevState;
          });
        } else {
          // delete event, day, month and year
          setEventsObj(prevState => {
            delete prevState[displayYear];
            return prevState;
          });
        };
        setEventToDelete(false);
      };
    }, 300);
    return () => clearTimeout(timeoutID);
  }, [eventToDelete, eventsObj]);
// -- End: Delete Event --

  return (
    <div className="App">
      <Header updateModal={updateModal} />
      <Main 
        eventsObj={eventsObj}
        modal={modal}
        updateModal={updateModal}
        formData={formData}
        setFormData={setFormData}
        handleForm={saveDate}
        deleteEvent={deleteEvent}
      /> 
      <Footer />
    </div>
  );
}

export default App;
