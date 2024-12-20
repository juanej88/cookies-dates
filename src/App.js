import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login/Login';
import Main from './components/Main';
import Loader from './components/Loader';
import Footer from './components/Footer';
import getAllEvents from './assets/helper_functions/getAllEvents';
import eventApi from './assets/helper_functions/eventApi';
import createClientEvent from './assets/helper_functions/createClientEvent';
import deleteClientEvent from './assets/helper_functions/deleteClientEvent';

const App = () => {
  const [userEvents, setUserEvents] = useState({});
  const [formData, setFormData] = useState({});
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(authToken ? true : false);
  const [login, setLogin] = useState(authToken ? true : false);
  const [user, setUser] = useState(null);
  
  const updateUser = (key, value) => {
    localStorage.setItem(key, value);
    setUser(prevStatus => {
      return {
        ...prevStatus,
        [key]: value,
      };
    });
  };
  useEffect(() => {
    if(authToken) {
      const setUpEvents = async () => {
        await getAllEvents(authToken, setUserEvents, setLoading, setLogin);
        const messagesLeft = localStorage.getItem('messagesLeft');
        updateUser('messagesLeft', messagesLeft);
      };
      setUpEvents();
    };
  }, [authToken]);

  useEffect(() => {
    if (!user) {
      setUser({
        firstName: localStorage.getItem('user'),
        messagesLeft: localStorage.getItem('messagesLeft'),
      });
    };
  }, [user]);

  // domEventToDelete gets updated with the functions updateModal when a user wants to delete an event, then it's used to add an animation if it's indeed deleted
  const [domEventToDelete, setDomEventToDelete] = useState(undefined);

  // -- This section updates the modal status according to the clicked source --
  const [modal, setModal] = useState({show: false, type: ''});
  const updateModal = (event, data) => {
    const eventID = !event ? undefined
    : event.target.id ? event.target.id 
    : event.target.parentNode.id;
    // it gets the event-card data to update and delete events, else, it blanks the form to add event
    if (data) {
      const [day, month, year] = data.date.split('-').reverse();
      if(data.full_date) data.dateInput = [day, month, year].join('/');
      else data.dateInput = [day, month].join('/');
      data.operation = eventID;
      setFormData(data);
    } else setFormData({
      id: 100, // I need to add 1 each time an event is created
      event_type: 'birthday',
      name: '',
      dateInput: '',
      date: '',
      notify: true,
      notification_days: 0,
      show: true,
      operation: eventID,
    });

    setModal(() => {
      switch(eventID) {
        case 'add-event':
        case 'update-event':
        case 'delete-event':
        case 'create-message':
          return {show: true, type: eventID};
        default:
          return {show: false, type: ''};
      };
    });

    if(eventID === 'delete-event') {
      setDomEventToDelete(event.target.parentNode.parentNode.parentNode);
    } else {
      setDomEventToDelete(undefined);
    };
  };

  const saveEvent = async (event, data, originalData) => {
    event.preventDefault();
    if(authToken) {
      if(data.operation === 'update-event') await deleteEvent(originalData);
      const response = await eventApi(data, authToken);
      response.show = true;
      createClientEvent(response, userEvents, setUserEvents);
    } else {
      if(data.operation === 'update-event') await deleteEvent(originalData);
      data.show = true;
      createClientEvent(data, userEvents, setUserEvents);
    };
    updateModal();
  };

  const [eventToDelete, setEventToDelete] = useState(null);
  const deleteEvent = async event => {
    if(event.operation === 'update-event') {
      deleteClientEvent(event, userEvents, setUserEvents, domEventToDelete, setDomEventToDelete);
    } else {
      if(authToken) await eventApi(event, authToken);
      const { displayYear } = event;
      let [ day, month ] = event.dateInput.split('/');
      day = Number(day);
      month = Number(month);
      if (userEvents[displayYear][month][day].length > 1) {
        domEventToDelete.classList.add('delete-animation');
      } else if (Object.keys(userEvents[displayYear][month]).length > 1) {
        domEventToDelete.classList.add('delete-animation');
      } else if (Object.keys(userEvents[displayYear]).length > 1) {
        domEventToDelete.parentNode.classList.add('delete-animation');
      } else {
        domEventToDelete.parentNode.parentNode.classList.add('delete-animation');
      };
      setEventToDelete(event);
      updateModal();
    };
  };

  // it deletes the event from userEvents once the animation is concluded
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if(eventToDelete) {
        deleteClientEvent(eventToDelete, userEvents, setUserEvents, setEventToDelete);
      };
    }, 300);
    return () => clearTimeout(timeoutID);
  }, [eventToDelete, setEventToDelete, userEvents, setUserEvents]);

  const updatePreviousMessage = event => {
    deleteClientEvent(event, userEvents, setUserEvents);
    createClientEvent(event, userEvents, setUserEvents);
  };

  return (
    <div className="App">
        <Header updateModal={updateModal} login={login} setLogin={setLogin} />
        {loading && <Loader/>}
        {login && <Main 
          userEvents={userEvents}
          user={user}
          updateUser={updateUser}
          modal={modal}
          updateModal={updateModal}
          formData={formData}
          setFormData={setFormData}
          handleForm={saveEvent}
          deleteEvent={deleteEvent}
          updatePreviousMessage={updatePreviousMessage}
        />}
        {!login && <Login
          setLogin={setLogin}
          setLoading={setLoading}
          setUser={setUser}
          setUserEvents={setUserEvents}
          setAuthToken={setAuthToken}
        />}
        <Footer />
    </div>
  );
}

export default App;
