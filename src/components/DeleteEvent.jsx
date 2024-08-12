import '../assets/styles/DeleteEvent.css';
import { useEffect } from 'react';

const DeleteEvent = props => { 
  const getMessage = () => {
    let endChar = props.data.name.split('');
    endChar[endChar.length - 1] === 's' ? endChar = `'` :
    endChar = `'s`;
    return props.data.event === 'birthday' ?
    <p><strong>{props.data.name}{endChar}</strong> birthday will be deleted.</p> :
    <p>The event titled <strong>"{props.data.name}"</strong> will be deleted.</p>
  };

  const handleClick = () => {
    props.deleteEvent(props.data);
  };

  useEffect(() => {
    console.log(props.data);
  });

  return (
    <aside className='delete-message-container'>
      {getMessage()}
      <button type='submit' onClick={handleClick}>Delete</button>
    </aside>
  );
};

export default DeleteEvent;