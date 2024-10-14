import { useState, useEffect } from 'react';
import '../assets/styles/ShareOptions.css';

const ShareOptions = props => {
  const [clipboardStatus, setClipboardStatus] = useState('Copy');
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(props.message);
      setClipboardStatus('Copied');
    } catch (error) {
      console.error(error.message);
      setClipboardStatus('Try again');
    };
  };
  useEffect(() => {
    const toggleClipboardStatus = setTimeout(() => {
      if(clipboardStatus !== 'Copy') setClipboardStatus('Copy');
    }, 2000);
    return () => clearTimeout(toggleClipboardStatus);
  }, [clipboardStatus]);

  const shareViaSMS = () => {
    const encodedMessage = encodeURIComponent(props.message);
    const smsLink = `sms:?body=${encodedMessage}`;
    window.open(smsLink, '_blank');
  };

  const shareToWhatsapp = () => {
    const encodedMessage = encodeURIComponent(props.message);
    const whatsappShareLink = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(whatsappShareLink, '_blank');
  };
  
  return (
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
  );
};

export default ShareOptions;