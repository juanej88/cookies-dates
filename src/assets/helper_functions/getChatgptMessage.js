import axios from 'axios';

const getChatgptMessage = async (data, personDetails, authToken) => {
  let apiError;
  const endPoint = `${process.env.REACT_APP_CHATGPT_END_POINT}${data.id}`;
  const payload = {
    person_details: personDetails
  };
  try {
    const response = await axios.patch(endPoint, payload, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`,
      }
    });
    if(process.env.REACT_APP_MODE === 'DEV') {
      console.log('The ChatGPT Message was created successfully', response);
    };
    return response;
  } catch (error) {
    apiError = error.response;
  };
  return apiError;
};

export default getChatgptMessage;