import { useState, useEffect, useRef } from 'react';
import '../assets/styles/CreateMessage.css';
import getChatgptMessage from '../assets/helper_functions/getChatgptMessage';

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
    };
    setCreating(false);
  };

  const [clipboardStatus, setClipboardStatus] = useState('Copy');
  const copyToClipboard = () => {
    if(props.data.previous_message) {
      navigator.clipboard.writeText(message).then(
        function() {
          setClipboardStatus('Copied');
        },
        function() {
          setClipboardStatus('Try again');
        }
      );
    };    
  };
  useEffect(() => {
    const toggleClipboardStatus = setTimeout(() => {
      if(clipboardStatus !== 'Copy') setClipboardStatus('Copy');
    }, 2000);
    return () => clearTimeout(toggleClipboardStatus);
  }, [clipboardStatus]);

  const shareToWhatsapp = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappShareLink = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(whatsappShareLink, '_blank');
  };

  const shareViaSMS = () => {
    const encodedMessage = encodeURIComponent(message);
    const smsLink = `sms:?body=${encodedMessage}`;
    window.open(smsLink, '_blank');
  };

  return (
    <aside className='create-message-container'>
      <div className='message-container'>
        <p>{message}</p>
        <div className='share-container'>
          <div className='share-icon-container'>
            <button className='share-btn' onClick={copyToClipboard}>
              <i className='fa-regular fa-copy'></i>
            </button>
            <p className='icon-text'>{clipboardStatus}</p>
          </div>
          <div className='share-icon-container'>
            <button className='share-btn' onClick={shareViaSMS}>
              <i className='fa-regular fa-comment'></i>
            </button>
            <p className='icon-text'>Message</p>
          </div>
          <div className='share-icon-container'>
            <button className='share-btn' onClick={shareToWhatsapp}>
            <i className='fa-brands fa-whatsapp'></i>
            </button>
            <p className='icon-text'>WhatsApp</p>
          </div>
        </div>
      </div>
      <p className='info-text'>Messages Left: 9</p>
      <textarea id='user-input' name='user-input' maxLength='200' ref={textareaRef} value={userInputValue} onChange={handleInputChange} placeholder='Write a funny message in Spanish'></textarea>
      <p className='info-text'>{userInputValue.length}/200</p>
      <button type='submit' onClick={getMessage} disabled={!token || creating}>
        {!creating && 'Create'}
        {creating && 'Creating...'}
      </button>
    </aside>
  );
};

export default CreateMessage;