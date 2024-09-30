import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login/Login';
import Main from './components/Main';
import Loader from './components/Loader';
import Footer from './components/Footer';
import eventApi from './assets/helper_functions/eventApi';
import createClientEvent from './assets/helper_functions/createClientEvent';

const App = () => {
  const [userEvents, setUserEvents] = useState({});

  useEffect(() => {
    console.log(userEvents);
  }, [userEvents]);

  const [formData, setFormData] = useState({
    id: 100,
    event_type: 'birthday',
    name: '',
    dateInput: '',
    date: '',
    show: false,
  });

  const saveDate = async (event, data, originalData) => {
    event.preventDefault();
    const authToken = localStorage.getItem('authToken');
    if(authToken) {
      if(data.operation === 'update-event') await deleteEvent(originalData);
      const response = await eventApi(data, authToken);
      response.show = true;
      createClientEvent(response, userEvents, setUserEvents);
      // createClientEvent({events: [response]});
    } else {
      if(data.operation === 'update-event') await deleteEvent(originalData);
      data.show = true;
      createClientEvent(data, userEvents, setUserEvents);
      // createClientEvent({events: [data]});
    };

    setFormData({
      // I need to remove it once it's sent to the back-end 
      // and generate a random number
      id: 101,
      event_type: 'birthday',
      name: '',
      dateInput: '',
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
      id: 100,
      event_type: 'birthday',
      name: '',
      dateInput: '',
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
    const { displayYear } = eventData;
    let [ day, month ] = eventData.dateInput.split('/');
    day = Number(day);
    month = Number(month);
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
      const { id, displayYear } = eventToDelete;
      let [ day, month ] = eventToDelete.dateInput.split('/');
      day = Number(day);
      month = Number(month);
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
