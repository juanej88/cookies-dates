import axios from 'axios';
import sortEvents from './sortEvents';

const getAllEvents = async (authToken, setUserEvents, setLoading, setLogin) => {
  const endPoint = `${process.env.REACT_APP_EVENTS_END_POINT}`;
  try {
    const response = await axios.get(endPoint, {
      headers: {
        Authorization: `Token ${authToken}`
      }
    });
    console.log('Response: ', response);
    setUserEvents(sortEvents(response.data));
    setLoading(false);
    setLogin(true);
  } catch (error) {
    console.error('Data failed', error);
  };
};

export default getAllEvents;