import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const handleGoogleLogin = async (credentialResponse) => {
    const { credential } = credentialResponse;

    try {
      const response = await axios.post(`${process.env.REACT_APP_GOOGLE_LOGIN_END_POINT}`, {
        token: credential,
      });
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    };
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => console.log('Login Failed')}
    />
  );
};

export default Login;