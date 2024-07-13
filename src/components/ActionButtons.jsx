import { useEffect, useState } from 'react';
import '../assets/styles/ActionButtons.css';
import Modal from './Modal';
import ActionButton from './ActionButton';

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
      <section id='action-buttons'>
        <ActionButton handleClick={toggleModal} id='add-event-btn' >
          <span class="material-symbols-outlined">
            calendar_add_on
          </span>
        </ActionButton>

        <ActionButton id='show-calendar-btn' >
          <span class="material-symbols-outlined">
            calendar_month
          </span>
        </ActionButton>
      </section>
    </>
  );
};

export default ActionButtons;