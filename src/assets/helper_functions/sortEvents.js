// import dummyData from './dummyData';
class Events {
  constructor() {
    this.events = {}
  };

  addEvent(year, month, day, event) {
    // add year if it doesn't exist
    if(!(year in this.events)) {
      this.events[year] = {};
    };
    // add month if it doesn't exist
    if(!(month in this.events[year])) {
      this.events[year][month] = {};
    };
    // add day if it doesn't exist
    if(!(day in this.events[year][month])) {
      this.events[year][month][day] = [{
        ...event,
        displayYear: year,
      }];
    } else { // or update the day array
      this.events[year][month][day] = [
        ...this.events[year][month][day],
        {
          ...event,
          displayYear: year,
        }
      ];
    };
  };

  sort(data) {
    const today = new Date();
    const thisYear = today.getFullYear();
    data.events.forEach(event => {
      let eventDate = new Date(event.date).setFullYear(thisYear);
      if (event.year > thisYear) {
        // pass data as it is if the event is in the upcoming years
        this.addEvent(event.year, event.month, event.day, event);
      } else if (eventDate >= today) {
        // pass thisYear for the events which haven't passed
        this.addEvent(thisYear, event.month, event.day, event);
      } else {
        // pass next year for the events that have passed
        this.addEvent(thisYear + 1, event.month, event.day, event);
      };
    });
    return this.events;
  };
};


const sortEvents = data => {
  const sortedEvents = new Events();
  sortedEvents.sort(data);
  return sortedEvents.events;
};

export default sortEvents;
