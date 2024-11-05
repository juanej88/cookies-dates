import { useState } from 'react';
import '../assets/styles/DeleteEvent.css';

const DeleteEvent = props => { 
  const getMessage = () => {
    let endChar = props.data.name.split('');
    endChar[endChar.length - 1] === 's' ? endChar = `'` :
    endChar = `'s`;
    return props.data.event === 'birthday' ?
    <p>Delete <strong>{props.data.name}{endChar}</strong> birthday?</p> :
    <p>Delete the event titled <strong>"{props.data.name}"</strong>?</p>
  };

  const [deleteTag, setDeleteTag] = useState('Delete')
  const handleClick = () => {
    setDeleteTag('Deleting...');
    props.deleteEvent(props.data);
  };

  return (
    <aside className='delete-message-container'>
      {getMessage()}
      <button type='submit' onClick={handleClick} disabled={deleteTag === 'Deleting...'}>{deleteTag}</button>
    </aside>
  );
};

export default DeleteEvent;