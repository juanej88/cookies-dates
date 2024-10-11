import { useState, useRef } from 'react';
import '../assets/styles/CreateMessage.css';

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
    return token ? `Create a birthday message for ${props.data.name}! You can share a few details to personalise it, or simply press 'Create' and we'll handle the rest!` : `Create birthday messages for your loved ones! Share a few details to personalise it, or simply press 'Create' and we'll handle the rest! Log in now to get started!`
  }

  return (
    <aside className='create-message-container'>
      <p>{getUserInstructions()}</p>
      <textarea id='user-input' name='user-input' maxLength='200' ref={textareaRef} value={userInputValue} onChange={handleInputChange} placeholder='Write a funny message in Spanish' autoFocus></textarea>
      <p>{userInputValue.length}/200</p>
      <button type='submit' disabled={!token}>Create</button>
    </aside>
  );
};

export default CreateMessage;