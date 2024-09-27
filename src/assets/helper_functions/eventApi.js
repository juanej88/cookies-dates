import axios from 'axios';

const createEvent = async (data, authToken) => {
  const endPoint = `${process.env.REACT_APP_EVENTS_END_POINT}`;
  const payload = {
    name: data.name,
    date: data.date,
    full_date: data.full_date,
    event_type: data.event_type,
    notify: true, // I need to change it once I add it in the form
    notification_days: 0, // I need to change it once I add it in the form
  };
  try {
    const response = await axios.post(endPoint, payload, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`,
      }
    });
    console.log('The event was added successfully', response.data);
    data = { ...data, id: response.data.id };
    return data;
  } catch (error) {
    console.error('Add Event failed', error);
  };
};

const eventApi = (data, authToken) => {
  if(data.operation === 'add-event') {
    const response = createEvent(data, authToken);
    return response;
  };
};

export default eventApi;