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
    <section id='action-buttons-section'>
      {modal && <Modal toggleModal={toggleModal} />}
      <button id='add-date-btn' className='button' onClick={toggleModal}>Add Date</button>
      <button id='show-calendar-btn' className='button'>Show Calendar</button>
    </section>
  );
};

export default ActionButtons;