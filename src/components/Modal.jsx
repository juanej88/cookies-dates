import { useState } from 'react';
import '../assets/styles/Modal.css';

const Modal = props => {
  // it hides the Modal component when a user double clicks anywhere outside the form
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
    : 'Event';
  };

  return (
    <section id='modal-container' onClick={handleExteriorClick}>
      <article className='modal-window'>
        <aside className='form-title-container'>
          <h2>{getTitle()}</h2>
          <button className='close-btn' onClick={props.updateModal}>+</button>
        </aside>
        {props.children}
      </article>
    </section>
  );
};

export default Modal;