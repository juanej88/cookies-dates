import { useState, useEffect } from 'react';
import '../assets/styles/AddEvent.css';

const AddEvent = props => {
  const [isFormValid, setIsFormValid] = useState({
    nameValid: false,
    dateValid: false,
  });

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

  // it validates the date
  useEffect(() => {
    const validateName = () => {
      // nameRegex asserts to have a name input of minimum 2 characters (together or separate) up to 25, excluding whitespaces around them, and does not accept the following characters @#$%^*=+?<>
      const nameRegex = /^\s*[^\s@#$%^*=+?<>]{1}\s*[^\s@#$%^*=+?<>]{1}[^@#$%^*=+?<>]{0,23}$/;
      const isNameValid = nameRegex.test(props.formData.name);
      return isNameValid;
    };
    setIsFormValid(prevState => {
      return {...prevState, nameValid: validateName()};
    });
  }, [props.formData.name]);

  const [outOfFocus, setOutOfFocus] = useState({name: false, dateInput: false});

  const handleOnBlur = event => {
    const eventName = event.target.name;
    setOutOfFocus(prevState => {
      return {...prevState, [eventName]: true};
    });
  };

  return (
      <form id='event-form' onSubmit={props.handleForm} autoComplete="off">
        <fieldset className='event-options-container'>
          <legend className='event-options-title'>Type</legend>
          <input type='radio' name='event' id='birthday' className='event-options' value='birthday' onChange={updateFormData} checked={props.formData.event === 'birthday'} />
          <label htmlFor='birthday' className='event-label'>
            <span></span>
            Birthday
          </label>
          <input type='radio' name='event' id='special' className='event-options' value='special' onChange={updateFormData} checked={props.formData.event === 'special'} />
          <label htmlFor='special' className='event-label'>
            <span></span>
            Special Event
          </label>
        </fieldset>

        <fieldset className='form-input-container'>
          <label htmlFor='name-input'>Name</label>
          <input type='text' name='name' id='name-input' minLength='2' maxLength='25' value={props.formData.name} onChange={updateFormData} required onBlur={handleOnBlur} autoFocus />
          {isFormValid.nameValid &&
            <span className='material-symbols-outlined checker valid'>
              check
            </span>
          }
          {!isFormValid.nameValid && outOfFocus.name &&
            <span className='material-symbols-outlined checker invalid'>
              close
            </span>
          }
        </fieldset>

        <fieldset className='form-input-container'>
          <label htmlFor='date-input'>Date</label>
          <input type='text' name='dateInput' id='date-input' min-length='5' maxLength='10' value={props.formData.dateInput} onChange={updateFormData} inputMode='numeric' placeholder='DD/MM/YYYY' required onBlur={handleOnBlur} />
          {isFormValid.dateValid &&
            <span className='material-symbols-outlined checker valid'>
              check
            </span>
          }
          {!isFormValid.dateValid && outOfFocus.dateInput &&
            <span className='material-symbols-outlined checker invalid'>
              close
            </span>
          }
        </fieldset>
        
        <button type='submit' id='save-date' disabled={!isFormValid.nameValid || !isFormValid.dateValid}>
          Add
        </button>
      </form>
  );
};

export default AddEvent;