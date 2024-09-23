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
    data.forEach(event => {
      const [eventYear, eventMonth, eventDay] = event.date.split('-');
      let eventDate = new Date(event.date).setFullYear(thisYear);
      if (eventYear > thisYear) {
        // pass data as it is if the event is in the upcoming years
        this.addEvent(eventYear, eventMonth, eventDay, event);
      } else if (eventDate >= today) {
        // pass thisYear for the events which haven't passed
        this.addEvent(thisYear, eventMonth, eventDay, event);
      } else {
        // pass next year for the events that have passed
        this.addEvent(thisYear + 1, eventMonth, eventDay, event);
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
