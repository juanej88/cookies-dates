import { useState } from 'react';
import '../assets/styles/Modal.css';

const Modal = props => {
  // it hides the Modal component when a user double clicks anywhere outside the form
  const [doubleClick, setDoubleClick] = useState(false);
  const handleExteriorClick = (e) => {
    if (e.target.getAttribute('id') === 'modal-container') {
      doubleClick ? props.toggleModal() : setDoubleClick(true);
    } else {
      setDoubleClick(false);
    };
  };

  const closeModal = () => {
    props.toggleModal();
  };

  return (
    <section id='modal-container' onClick={handleExteriorClick}>
      <article className='modal-window'>
        <aside className='form-title-container'>
          <h2>{props.title}</h2>
          <button className='close-btn' onClick={closeModal}>+</button>
        </aside>
        {props.children}
      </article>
    </section>
  );
};

export default Modal;