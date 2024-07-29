import '../assets/styles/Event.css';
import ActionButton from './ActionButton';

const Event = props => { 

  const openMoreOptions = event => {
    const targetNode = event.target.parentNode;
    // this removes the close-more-options if it was clicked before to allow to play the open-more-options animation
    if (targetNode.className.split(' ').indexOf('close-more-options') !== -1) targetNode.classList.remove('close-more-options');

    if (props.currentNode !== targetNode) {
      if (props.currentNode) {
        props.currentNode.classList.remove('open-more-options');
        props.currentNode.classList.add('close-more-options');
      };
      props.setCurrentNode(targetNode);
      targetNode.classList.add('open-more-options');
    } else {
      targetNode.classList.add('close-more-options');
      props.currentNode.classList.remove('open-more-options');
      props.setCurrentNode(undefined);
    }
  };

  return (
    <aside className={`event-card ${props.event}`} id={`${props.new ? 'newEvent' : ''}`} onClick={openMoreOptions}>
      <div className='event-container'>
        <span></span>
        <p>{props.name}</p>
      </div>
      <div className='date-container'>
        <p>{props.date}</p>
      </div>
      <div className='more-options-container'>
        <span className='material-symbols-outlined'>
          more_vert
        </span>
        <ActionButton className='update-btn'>
          <span className="material-symbols-outlined">
            edit
          </span>
        </ActionButton>
        <ActionButton className='delete-btn'>
        {/* <ActionButton className='delete-btn' handleClick={openDeletionWindow}> */}
          <span className="material-symbols-outlined">
            delete
          </span>
        </ActionButton>
      </div>
      <div className='event-container-btn'></div>
    </aside>
  );
};

export default Event;