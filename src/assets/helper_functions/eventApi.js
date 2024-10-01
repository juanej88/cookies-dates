import axios from 'axios';

const createEvent = async (data, payload, authToken) => {
  const endPoint = `${process.env.REACT_APP_EVENTS_END_POINT}`;
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

const updateEvent = async (data, payload, authToken) => {
  const endPoint = `${process.env.REACT_APP_EVENTS_END_POINT}${data.id}`;
  try {
    const response = await axios.put(endPoint, payload, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`,
      }
    });
    console.log('The event was updated successfully', response.data);
    return data;
  } catch (error) {
    console.error('Update Event failed', error);
  };
};

const deleteEvent = async (data, authToken) => {
  const endPoint = `${process.env.REACT_APP_EVENTS_END_POINT}${data.id}`;
  try {
    const response = await axios.delete(endPoint, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`,
      }
    });
    console.log('The event was deleted successfully', response);
    return response;
  } catch (error) {
    console.error('Delete Event failed', error);
  };
};

const eventApi = (data, authToken) => {
  const payload = {
    name: data.name,
    date: data.date,
    full_date: data.full_date,
    event_type: data.event_type,
    notify: true, // I need to change it once I add it in the form
    notification_days: 0, // I need to change it once I add it in the form
  };
  
  if(data.operation === 'add-event') {
    const response = createEvent(data, payload, authToken);
    return response;
  } else if (data.operation === 'update-event') {
    const response = updateEvent(data, payload, authToken);
    return response;
  } else if (data.operation === 'delete-event') {
    const response = deleteEvent(data, authToken);
    return response;
  };
};

export default eventApi;