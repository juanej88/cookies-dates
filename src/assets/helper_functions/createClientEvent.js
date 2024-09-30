const createEventFromYear = (year, month, day, event, setUserEvents) => {
  setUserEvents(prevState => {
    return {
      ...prevState,
      [year]: {[month]: {[day]: [{...event, displayYear: year}]}},
    };
  });
};

const createEventFromMonth = (year, month, day, event, setUserEvents) => {
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

const createEventFromDay = (year, month, day, event, setUserEvents) => {
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

const createEventOnly = (year, month, day, event, setUserEvents) => {
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

const checkUserEvents = (year, month, day, event, userEvents, setUserEvents) => {
  if(!(year in userEvents)) {
    createEventFromYear(year, month, day, event, setUserEvents);
  } else if(!(month in userEvents[year])) {
    createEventFromMonth(year, month, day, event, setUserEvents);
  } else if(!(day in userEvents[year][month])) {
    createEventFromDay(year, month, day, event, setUserEvents);
  } else {
    createEventOnly(year, month, day, event, setUserEvents);
  };
};

const createClientEvent = (event, userEvents, setUserEvents) => {
  // genericToday gets formatted to compare the today variable to the eventDate variable so it can add the event which is on the current day to the top in the Upcoming Events section; otherwise, it would be render to the next year
  const genericToday = new Date().toLocaleDateString(undefined, {day: '2-digit', month: 'short',  year:'numeric'});
  const today = new Date(genericToday);
  const thisYear = today.getFullYear();

  const [eventYear, eventMonth, eventDay] = event.date.split('-');
    let eventDate = new Date(event.date).setFullYear(thisYear);
    if (eventYear > thisYear) {
      // pass data as it is if the event is in the upcoming years
      checkUserEvents(Number(eventYear), Number(eventMonth), Number(eventDay), event, userEvents, setUserEvents);
    } else if (eventDate >= today) {
      // pass thisYear for the events which haven't passed
      checkUserEvents(thisYear, Number(eventMonth), Number(eventDay), event, userEvents, setUserEvents);
    } else {
      // pass next year for the events that have passed
      checkUserEvents(thisYear + 1, Number(eventMonth), Number(eventDay), event, userEvents, setUserEvents);
    };
};

export default createClientEvent;