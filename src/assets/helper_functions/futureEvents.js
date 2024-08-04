import dummyData from './dummyData';

const futureEvents = {};

const addEvent = (year, month, day, event) => {
  // add year if it doesn't exist
  if(!(year in futureEvents)) {
    futureEvents[year] = {};
  };
  // add month if it doesn't exist
  if(!(month in futureEvents[year])) {
    futureEvents[year][month] = {};
  };
  // add day if it doesn't exist
  if(!(day in futureEvents[year][month])) {
    futureEvents[year][month][day] = [{
      ...event,
      displayYear: year,
    }];
  } else { // or update the day array
    futureEvents[year][month][day] = [
      ...futureEvents[year][month][day],
      {
        ...event,
        displayYear: year,
      }
    ];
  };
};

const checkEvents = data => {
  const today = new Date();
  const thisYear = today.getFullYear();
  data.events.forEach(event => {
    let eventDate = new Date(event.date).setFullYear(thisYear);
    if (event.year > thisYear) {
      // pass data as it is if the event is in the upcoming years
      addEvent(event.year, event.month, event.day, event);
    } else if (eventDate >= today) {
      // pass thisYear for the events which haven't passed
      addEvent(thisYear, event.month, event.day, event);
    } else {
      // pass next year for the events that have passed
      addEvent(thisYear + 1, event.month, event.day, event);
    };
  });
};

checkEvents(dummyData);

export default futureEvents;
