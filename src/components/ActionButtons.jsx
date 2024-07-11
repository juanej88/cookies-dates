import { useEffect, useState } from 'react';
import '../assets/styles/ActionButtons.css';
import Modal from './Modal';

const ActionButtons = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(prevState => !prevState);
  };

  // it doesn't allow the body to be scrolled while the modal is active
  useEffect(() => {
    modal ? 
      document.body.style.overflow = 'hidden' : 
      document.body.style.overflow = 'visible';
  }, [modal]);

  return (
    <>
      {modal && <Modal toggleModal={toggleModal} />}
      <section id='action-buttons-section'>
        <div role='button' id='add-event-btn' className='button' onClick={toggleModal}>
          <span class="material-symbols-outlined">
            calendar_add_on
          </span><p>Add Event</p></div>
        <div role='button' id='show-calendar-btn' className='button'>
          <span class="material-symbols-outlined">
            calendar_month
          </span><p>Show Calendar</p></div>
      </section>
    </>
  );
};

export default ActionButtons;