import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import '../../assets/styles/Login/Login.css';
import googleIcon from '../../assets/icons/google.svg';

const Login = props => {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_GOOGLE_LOGIN_END_POINT}`, {
          token: tokenResponse.access_token,
        });
        props.updateUser(response.data);
        console.log('Login successful', response.data);
      } catch (error) {
        console.error('Login failed', error);
      }
    },
    onFailure: error => console.log('Login Failed:', error),
  });

  return (
    <main id='login-main'>
      <section className='login-container'>
        <h1>Log In</h1>
        <button id='google-btn' onClick={googleLogin} >
          <img src={googleIcon} className='google-icon' alt='Google logo' />
          Continue with Google
        </button>
        <p>or</p>
        <button id='demo-mode-btn' onClick={() => props.updateUser('guest')}>
          Explore Demo Mode
        </button>
      </section>
    </main>
  );
};

export default Login;