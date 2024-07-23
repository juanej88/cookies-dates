import { useEffect, useState } from 'react';
import '../assets/styles/Modal.css';

const Modal = (props) => {
  // it hides the Modal component when a user double clicks anywhere outside the form
  const [doubleClick, setDoubleClick] = useState(false);
  const handleExteriorClick = (e) => {
    if (e.target.getAttribute('id') === 'add-event-section') {
      doubleClick ? props.toggleModal() : setDoubleClick(true);
    } else {
      setDoubleClick(false);
    };
  };

  const closeModal = () => {
    props.toggleModal();
  };

  const [isFormValid, setIsFormValid] = useState({
    nameValid: false,
    dateValid: false,
  });

  useEffect(() => {
    console.log(isFormValid);
  }, [isFormValid]);

  const validateDate = (inputDate, inputDay) => {
    const newDay = new Date(inputDate).getDate();
    return newDay === inputDay;
  };

  const [cursorPosition, setCursorPosition] = useState(0);

  const updateFormData = e => {
    if(e.target.name !== 'dateInput') {
      props.setFormData({
        ...props.formData,
        [e.target.name]: e.target.value,
      });
    } else {
      // it formats the date input to display DD/MM/YYYY
      let dateInput = e.target.value.split('');
      dateInput.forEach((element, idx) => {
        if ((idx === 2 || idx === 5) && element !== '/') {
          dateInput.splice(idx, 0, '/');
        } else if ((idx === 2 || idx === 5) && element === '/') {
          if(dateInput.length === idx + 1) dateInput.splice(idx, 1);
        } else if((idx !== 2 || idx !== 5) && element === '/') {
          dateInput.splice(idx, 1);
        }
      });
      // it updates the cursor position if the user edits the input from the beginning to the second last character
      if (dateInput.length - props.formData.dateInput.length > 1) {
        setCursorPosition(e.target.selectionStart + 1);
      } else {
        setCursorPosition(e.target.selectionStart);
      }
      dateInput = dateInput.join('');
      if(dateInput.length !== 10) {
        props.setFormData({
          ...props.formData,
          [e.target.name]: dateInput,
          day: '',
          month: '',
          year: '',
          date: '',
        });
        setIsFormValid({
          ...isFormValid,
          dateValid: false,
        });
      } else {
        const [day, month, year] = dateInput.split('/');
        const date = dateInput.split('/').reverse().join('-');
        props.setFormData({
          ...props.formData,
          [e.target.name]: dateInput,
          day: Number(day),
          month: Number(month),
          year: Number(year),
          date: date,
        });
        validateDate(date, Number(day)) ? 
          setIsFormValid({
            ...isFormValid,
            dateValid: true,
          })
        :
          setIsFormValid({
            ...isFormValid,
            dateValid: false,
          });
      };
    };
  };
  
  // it moves the cursor to the previous position when a user edits the date input from the beginning to the second last character
  useEffect(() => {
    // the if statement prevents the name input autofocus to be passed to the date input
    if(props.formData.dateInput !== '') {
      const dateInput = document.getElementById('date-input');
      dateInput.setSelectionRange(cursorPosition, cursorPosition);
    };
  }, [props.formData.dateInput, cursorPosition]);

  return (
    <section id='add-event-section' onClick={handleExteriorClick}>
      <form id='event-form' onSubmit={props.handleForm} autoComplete="off">
        <div className='form-title-container'>
          <h2>New Event</h2>
          <button className='close-btn' onClick={closeModal}>+</button>
        </div>

        <fieldset>
          <legend>Type</legend>
          <div className='event-options-container'>
            <input type='radio' name='event' id='birthday' className='event-options' value='birthday' onChange={updateFormData} checked={props.formData.event === 'birthday'} />
            <label htmlFor='birthday' className='event-label'>
              Birthday
            </label>
            <input type='radio' name='event' id='special' className='event-options' value='special' onChange={updateFormData} checked={props.formData.event === 'special'} />
            <label htmlFor='special' className='event-label'>
              Special Event
            </label>
          </div>
        </fieldset>

        <fieldset className='form-input-container'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' id='name' minLength='2' maxLength='25' value={props.formData.name} onChange={updateFormData} required autoFocus />
          <span className='material-symbols-outlined valid'>check</span>
        </fieldset>

        <fieldset className='form-input-container'>
          <label htmlFor='date-input'>Date</label>
          <input type='text' name='dateInput' id='date-input' min-length='5' maxLength='10' value={props.formData.dateInput} onChange={updateFormData} inputMode='numeric' placeholder='DD/MM/YYYY' required />
          {isFormValid.dateValid ?
          <span className='material-symbols-outlined valid'>check</span> :
          <span className='material-symbols-outlined invalid'>check</span>
          }
        </fieldset>
        
        <button type='submit' id='save-date' disabled={!isFormValid.dateValid}>
        {/* I need to validate the name input to replace the above line with the below line */}
        {/* <button type='submit' id='save-date' disabled={!isFormValid.nameValid || !isFormValid.dateValid}> */}
          Add
        </button>
      </form>
    </section>
  );
};

export default Modal;