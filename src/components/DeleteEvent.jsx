import '../assets/styles/DeleteEvent.css';

const DeleteEvent = props => { 
  const getMessage = () => {
    let endChar = props.data.name.split('');
    endChar[endChar.length - 1] === 's' ? endChar = `'` :
    endChar = `'s`;
    return props.data.event === 'birthday' ?
    <p>Are you sure you want to delete <strong>{props.data.name}{endChar}</strong> birthday?</p> :
    <p>Are you sure you want to delete the event titled <strong>"{props.data.name}"</strong>?</p>
  };

  return (
    <aside className='delete-message-container'>
      <p><strong>Warning</strong>: Deleting this event is permanent and cannot be undone.</p>
      {getMessage()}
      <button type='submit'>Yes, delete it</button>
    </aside>
  );
};

export default DeleteEvent;