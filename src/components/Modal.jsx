import { useState } from 'react';
import '../assets/styles/Modal.css';
import ActionButton from './ActionButton';

const Modal = props => {
  // it hides the Modal component when a user double clicks anywhere outside the modal window
  const [doubleClick, setDoubleClick] = useState(false);
  const handleExteriorClick = (e) => {
    if (e.target.getAttribute('id') === 'modal-container') {
      doubleClick ? props.updateModal() : setDoubleClick(true);
    } else {
      setDoubleClick(false);
    };
  };

  const getTitle = () => {
    return props.eventID === 'add-event' ? 'New Event'
    : props.eventID === 'update-event' ? 'Update Event'
    : props.eventID === 'delete-event' ? 'Delete Event'
    : props.eventID === 'create-message' ? 'Create Message'
    : 'Event';
  };

  return (
    <section id='modal-container' onClick={handleExteriorClick}>
      <article className='modal-window'>
        <aside className='modal-title-container'>
          <h2>{getTitle()}</h2>
          <ActionButton id='close-btn' handleClick={props.updateModal}>
            <span className="material-symbols-outlined">
              close
            </span>
          </ActionButton>
        </aside>
        {props.children}
      </article>
    </section>
  );
};

export default Modal;
