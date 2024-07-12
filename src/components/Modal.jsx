import { useState } from 'react';
import '../assets/styles/Modal.css';

const Modal = (props) => {
  // it hides the Modal component when a user double clicks anywhere outside the form
  const [doubleClick, setDoubleClick] = useState(false);
  const handleExteriorClick = (e) => {
    if (e.target.getAttribute('id') === 'date-section') {
      doubleClick ? props.toggleModal() : setDoubleClick(true);
    } else {
      setDoubleClick(false);
    };
  };

  const closeModal = () => {
    props.toggleModal();
  };

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    month: '',
    day: '',
  });

  const updateFormData = (e) => {
    if (e.target.name ==='day' && formData.month) {
      const year = new Date().getFullYear();
      const newDate = `${year}-${formData.month}-${e.target.value}`;
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        date: newDate,
      });
    } else if(e.target.name === 'month' && formData.day) {
      const year = new Date().getFullYear();
      const newDate = `${year}-${e.target.value}-${formData.day}`;
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        date: newDate,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    
  };

  // this state determines to show either the date input or the 2 select elements 
  const [addYear, setAddYear] = useState(null);

  const showDate = (e) => {
    e.preventDefault();
    const option = e.target.id;
    option === 'yes-option' ? setAddYear(true) : setAddYear(false);
  };

  const getMonths = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthsElements = months.map((month, idx) => {
      const num = idx < 9 ? `0${idx + 1}` : idx + 1
      return <option key={num} value={num}>{month}</option>;
    });
    monthsElements.unshift(<option key='no-month' value=''></option>);
    return monthsElements;
  };

  const getDays = () => {
    const daysElements = [];
    for(let i = 1; i <= 31; i++) {
      const num = i < 10 ? `0${i}` : i;
      daysElements.push(<option key={num} value={num}>{i}</option>);
    };
    daysElements.unshift(<option key='no-day' value=''></option>);
    return daysElements;
  };

  const saveDate = (e) => {
    e.preventDefault();
    console.log('Date Saved!');
    console.log(formData);
  };

  return (
    <section id='date-section' onClick={handleExteriorClick}>
      <form id='date-form' onSubmit={saveDate} autocomplete="off">
        <div className='form-title-container'>
          <h2>New Event</h2>
          <div className='close-btn' tabIndex='0' role='button' onClick={closeModal}>+</div>
        </div>
        <label htmlFor="name">Name</label>
        <input type="text" name='name' id='name' minLength='2' maxLength='20' value={formData.name} onChange={updateFormData} required autoFocus />

        {(formData.name || addYear !== null) && 
          <fieldset>
            <legend>Do you want to include the year?</legend>
            <div className='yes-no-container'>
              <button className='yes-no' id='yes-option' onClick={showDate}>Yes</button>
              <button className='yes-no' id='no-option' onClick={showDate}>No</button>
            </div>
          </fieldset>
        }

        {addYear === true && <fieldset>
          <label htmlFor='date'>Date</label>
          <input type='date' name='date' id='date' value={formData.date} onChange={updateFormData}  required/>
        </fieldset>}
        
        {addYear === false && <fieldset id='day-month'>
          <label htmlFor='day'>Day</label>
          <select name="day" id="day" value={formData.day} onChange={updateFormData} required>
            {getDays()}
          </select>
          <label htmlFor='month'>Month</label>
          <select name="month" id="month" value={formData.month} onChange={updateFormData} required>
            {getMonths()}
          </select>
        </fieldset>}

        {formData.date && <button type='submit' id='save-date'>
          Add
        </button>}
      </form>
    </section>
  );
};

export default Modal;