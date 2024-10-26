import { useState, useRef } from 'react';
import '../assets/styles/CreateMessage.css';
import getChatgptMessage from '../assets/helper_functions/getChatgptMessage';
import ShareOptions from './ShareOptions';

const CreateMessage = props => {
  const [userInputValue, setUserInputValue] = useState('');
  const textareaRef = useRef(null);

  const handleInputChange = event => {
    setUserInputValue(event.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    textareaRef.current.style.height = '2.5rem'; // Reset height
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
  };
  
  const token = localStorage.getItem('authToken');
  const getUserInstructions = () => {
    return token ? `Create a birthday message for ${props.data.name}! You can share a few details to personalise it, or simply press 'Create' and we'll handle the rest!` : `Create birthday messages for your loved ones! Share a few details to personalise them, or simply press 'Create' and we'll handle the rest! Log in with Google now to get started!`;
  };

  const [message, setMessage] = useState(props.data.previous_message ? props.data.previous_message : getUserInstructions());
  const [creating, setCreating] = useState(false);

  const getMessage = async () => {
    setCreating(true);
    const response = await getChatgptMessage(props.data, userInputValue, token);
    if (response.status === 200) {
      setMessage(response.data.previous_message);
      props.data.previous_message = response.data.previous_message;
      props.updatePreviousMessage(props.data);
      setUserInputValue('');
      props.updateUser('messagesLeft', response.data.messages_left);
    } else {
      if(process.env.REACT_APP_MODE === 'DEV') {
        console.log('Status:', response.status, '\nDetail:', response.data.detail);
      };
    };
    setCreating(false);
  };

  const [showShareOptions, setShowShareOptions] = useState(false);
  const toggleShareOptions = () => {
    setShowShareOptions(prevState => !prevState);
  };

  return (
    <aside className='create-message-container'>
      <div className='message-container'>
        <p onClick={toggleShareOptions}>{message}</p>
        {showShareOptions && <ShareOptions message={message} toggleShareOptions={toggleShareOptions} />}
      </div>
      <p className='info-text'>Messages Left: {props.user.messagesLeft}</p>
      <textarea id='user-input' name='user-input' maxLength='200' ref={textareaRef} value={userInputValue} onChange={handleInputChange} placeholder='Write a funny message in Spanish'></textarea>
      <p className='info-text'>{userInputValue.length}/200</p>
      <button type='submit' onClick={getMessage} disabled={!token || creating || !props.user.messagesLeft}>
        {!creating && 'Create'}
        {creating && 'Creating...'}
      </button>
    </aside>
  );
};

export default CreateMessage;