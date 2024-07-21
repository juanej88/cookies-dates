import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Nav from './components/Nav';
import Footer from './components/Footer';
import futureEvents from './assets/helper_functions/futureEvents';

const App = () => {
  const [eventsObj, setEventsObj] = useState(futureEvents);

  const createEventFromYear = (year, month, day, event) => {
    setEventsObj(prevState => {
      return {
        ...prevState,
        [year]: {[month]: {[day]: [event]}},
      };
    });
  };

  const createEventFromMonth = (year, month, day, event) => {
    setEventsObj(prevState => {
      return {
        ...prevState,
        [year]: {
          ...prevState[year],
          [month]: {[day]: [event]},
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
            [day]: [event]
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
              event
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
      event.month = Number(event.month);
      event.day = Number(event.day);
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
      day: '',
      month: '',
      year: '',
      date: '',
      new: true,
    });
    toggleModal();
  };

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(prevState => !prevState);
  };

  return (
    <div className="App">
      <Header />
      <Main 
        eventsObj={eventsObj}
        modal={modal}
        toggleModal={toggleModal}
        formData={formData}
        setFormData={setFormData}
        handleForm={saveDate}
      /> 
      <Nav toggleModal={toggleModal} />
      <Footer />
    </div>
  );
}

export default App;
