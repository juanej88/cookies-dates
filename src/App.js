import { useState } from 'react';
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

  // -- This section updates the modal status according to the clicked source --
  const [modal, setModal] = useState({show: false, type: ''});
  const updateModal = (event, data) => {
    const eventID = !event ? undefined
    : event.target.id ? event.target.id 
    : event.target.parentNode.id;

    // it gets the event-card data to update and delete events, else, it blanks the form to add event
    if (data) setFormData(data);
    else setFormData({
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
  };

  // -- Delete Event --
  const deleteEvent = eventData => {
    const { id, day, month, displayYear } = eventData;
    setEventsObj(prevState => {
      const newState = {...prevState};
      if (newState[displayYear][month][day].length > 1) {
        const idx = newState[displayYear][month][day].findIndex(event => {
          return event.id === id;
        });
        // delete event in the array day
        newState[displayYear][month][day].splice(idx, 1);
      } else if (Object.keys(newState[displayYear][month]).length > 1) {
        // delete event and day
        delete newState[displayYear][month][day];
      } else if (Object.keys(newState[displayYear]).length > 1) {
        // delete event, day and month
        delete newState[displayYear][month];
      } else {
        // delete event, day, month and year
        delete newState[displayYear];
      };
      return newState;
    });
    updateModal();
  };

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
