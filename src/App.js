import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login/Login';
import Main from './components/Main';
import Loader from './components/Loader';
import Footer from './components/Footer';

const App = () => {
  const [userEvents, setUserEvents] = useState({});

  useEffect(() => {
    console.log(userEvents);
  }, [userEvents]);

  const createEventFromYear = (year, month, day, event) => {
    setUserEvents(prevState => {
      return {
        ...prevState,
        [year]: {[month]: {[day]: [{...event, displayYear: year}]}},
      };
    });
  };

  const createEventFromMonth = (year, month, day, event) => {
    setUserEvents(prevState => {
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
    setUserEvents(prevState => {
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
    setUserEvents(prevState => {
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
    if(!(year in userEvents)) {
      createEventFromYear(year, month, day, event);
    } else if(!(month in userEvents[year])) {
      createEventFromMonth(year, month, day, event);
    } else if(!(day in userEvents[year][month])) {
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
    show: false,
  });

  const saveDate = async (event, data, originalData) => {
    event.preventDefault();
    if (data.operation === 'update-event') {
      await deleteEvent(originalData);
      data.show = true;
    };  
    const newDate = {events: [data]};
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
      show: true,
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
      data.operation = eventID;
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
      show: true,
      operation: eventID,
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


  // -*-*- Start: Delete Event -*-*-


  const [eventToDelete, setEventToDelete] = useState(false);
  const deleteEvent = eventData => {
    const { day, month, displayYear } = eventData;
    // the conditions will add the class delete-animation to the correct DOM element
    if(eventData.operation === 'delete-event') {
      if (userEvents[displayYear][month][day].length > 1) {
        deletedEl.classList.add('delete-animation');
      } else if (Object.keys(userEvents[displayYear][month]).length > 1) {
        deletedEl.classList.add('delete-animation');
      } else if (Object.keys(userEvents[displayYear]).length > 1) {
        deletedEl.parentNode.classList.add('delete-animation');
      } else {
        deletedEl.parentNode.parentNode.classList.add('delete-animation');
      };
    };
    setEventToDelete(eventData);
    updateModal();
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 50);
    });
  };

  // it deletes the event from userEvents
  useEffect(() => {
    const deleteEventFromDOM = () => {
      const { id, day, month, displayYear } = eventToDelete;
        if (userEvents[displayYear][month][day].length > 1) {
          const idx = userEvents[displayYear][month][day].findIndex(event => event.id === id);
          // delete event in the array day
          setUserEvents(prevState => {
            prevState[displayYear][month][day].splice(idx, 1);
            return prevState;
          });
        } else if (Object.keys(userEvents[displayYear][month]).length > 1) {
          // delete event and day
          setUserEvents(prevState => {
            delete prevState[displayYear][month][day];
            return prevState;
          });
        } else if (Object.keys(userEvents[displayYear]).length > 1) {
          // delete event, day and month
          setUserEvents(prevState => {
            delete prevState[displayYear][month];
            return prevState;
          });
        } else {
          // delete event, day, month and year
          setUserEvents(prevState => {
            delete prevState[displayYear];
            return prevState;
          });
        };
        setEventToDelete(false);
    };

    const timeoutID = setTimeout(() => {
      if(eventToDelete && eventToDelete.operation === 'delete-event') {
        deleteEventFromDOM();
      };
    }, 300);

    if(eventToDelete && eventToDelete.operation === 'update-event') {
      deleteEventFromDOM();
    };

    return () => clearTimeout(timeoutID);
  }, [eventToDelete, userEvents]);


  // -*-*- End: Delete Event -*-*-

  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(
    localStorage.getItem('authToken') ? true : false
  );
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(localStorage.getItem('user'));
  }, [user]);

  return (
    <div className="App">
        <Header updateModal={updateModal} login={login} setLogin={setLogin} />
        {loading && <Loader/>}
        {login && <Main 
          userEvents={userEvents}
          modal={modal}
          updateModal={updateModal}
          formData={formData}
          setFormData={setFormData}
          handleForm={saveDate}
          deleteEvent={deleteEvent}
        />}
        {!login && <Login
          setLogin={setLogin}
          setLoading={setLoading}
          setUser={setUser}
          setUserEvents={setUserEvents}
        />}
        <Footer />
    </div>
  );
}

export default App;
