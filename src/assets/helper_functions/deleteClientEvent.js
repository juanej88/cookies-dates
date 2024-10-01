const deleteUserEvent = (event, userEvents, setUserEvents) => {
  const { id, displayYear } = event;
  let [ day, month ] = event.dateInput.split('/');
  day = Number(day);
  month = Number(month);
  if (userEvents[displayYear][month][day].length > 1) {
      // delete event in the array day
      setUserEvents(prevState => {
        prevState[displayYear][month][day] = prevState[displayYear][month][day].filter(thisEvent => thisEvent.id !== id);
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
};

const deleteClientEvent = async (event, userEvents, setUserEvents, setEventToDelete) => {
  deleteUserEvent(event, userEvents, setUserEvents);
  // the eventToDelete is set to null so React rerenders the DOM elements affected by the event deletion once the delete-animation is concluded
  if(event.operation === 'delete-event') {
    setEventToDelete(null);
  };
};

export default deleteClientEvent;