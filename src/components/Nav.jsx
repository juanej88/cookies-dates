import { useState } from 'react';
import '../assets/styles/Nav.css';
import Modal from './Modal';
import ActionButton from './ActionButton';

const Nav = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(prevState => !prevState);
  };

  return (
    <>
      {modal && <Modal toggleModal={toggleModal} />}
      <nav id='action-buttons'>
        <ActionButton handleClick={toggleModal} id='add-event-btn' >
          <span className="material-symbols-outlined">
            calendar_add_on
          </span>
        </ActionButton>

        <ActionButton id='show-calendar-btn' >
          <span className="material-symbols-outlined">
            calendar_month
          </span>
        </ActionButton>
      </nav>
    </>
  );
};

export default Nav;
