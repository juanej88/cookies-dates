import { useState } from 'react';
import '../assets/styles/Modal.css';

const Modal = (props) => {
  // it hides the Modal component when a user clicks anywhere outside the form
  const handleExteriorClick = (e) => {
    if (e.target.getAttribute('id') === 'date-section') {
      props.toggleModal();
    };
  };

  const [formData, setFormData] = useState({
    name: '',
    date: '',
  });

  const updateFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  let maxDate = new Date().toJSON();
  maxDate = maxDate.slice(0, 10);

  return (
    <section id='date-section' onClick={handleExteriorClick}>
      <form id='date-form'>
        <h2>Add Date</h2>
        <label htmlFor="name">Name</label>
        <input type="text" name='name' id='name' minLength='2' maxLength='20' value={formData.name} onChange={updateFormData} required autoFocus />
        <label htmlFor='date'>Date</label>
        <input type='date' name='date' id='date' max={maxDate} value={formData.date} onChange={updateFormData}  required/>
      </form>
    </section>
  );
};

export default Modal;