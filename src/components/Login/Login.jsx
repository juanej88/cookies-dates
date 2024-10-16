import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import '../../assets/styles/Login/Login.css';
import googleIcon from '../../assets/icons/google.svg';
import dummyData from '../../assets/helper_functions/dummyData';
import sortEvents from '../../assets/helper_functions/sortEvents';

const Login = props => {
    // Retrieve events from API after login is successful and authToken is set
  const getUserData = async authToken => {
    const endPoint = `${process.env.REACT_APP_EVENTS_END_POINT}`;
    try {
      const response = await axios.get(endPoint, {
        headers: {
          Authorization: `Token ${authToken}`
        }
      });
      console.log('Response: ', response);
      props.setUserEvents(sortEvents(response.data));
      props.setLoading(false);
      props.setLogin(true);
    } catch (error) {
      console.error('Data failed', error);
    };
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      props.setLoading(true);
      const timezoneOffset = new Date().getTimezoneOffset();
      const endPoint = `${process.env.REACT_APP_GOOGLE_LOGIN_END_POINT}`;
      const payload = {
        token: tokenResponse.access_token,
        timezoneOffset,
      };
      try {
        const response = await axios.post(endPoint, payload,
        { withCredentials: true });
        console.log('Login successful', response.data);
        props.setUser({
          firstName: response.data.first_name,
          messagesLeft: response.data.messages_left,
        });
        localStorage.setItem('user', response.data.first_name);
        localStorage.setItem('messagesLeft', response.data.messages_left);
        localStorage.setItem('authToken', response.data.token);
        getUserData(response.data.token);
      } catch (error) {
        console.error('Login failed', error);
      };
    },
    onFailure: error => console.log('Login Failed:', error),
  });

  const guestLogin = () => {
    props.setUser({
      firstName: 'guest',
      messagesLeft: 0,
    });
    localStorage.setItem('user', 'guest');
    props.setUserEvents(sortEvents(dummyData.data));
    props.setLoading(false);
    props.setLogin(true);
  };
  
  return (
    <main id='login-main'>
      <section className='login-container'>
        <h1>Log In</h1>
        <button id='google-btn' onClick={googleLogin} >
          <img src={googleIcon} className='google-icon' alt='Google logo' />
          Continue with Google
        </button>
        <p>or</p>
        <button id='demo-mode-btn' onClick={guestLogin}>
          Explore Demo Mode
        </button>
      </section>
    </main>
  );
};

export default Login;