import { useState, useEffect } from 'react';
import '../assets/styles/EventForm.css';

const EventForm = props => {
  // -*-*- Start: Update Form Data -*-*-

  const [cursorPosition, setCursorPosition] = useState(0);

  const updateFormData = e => {
    if(e.target.name !== 'dateInput') {
      props.setFormData({
        ...props.formData,
        [e.target.name]: e.target.value,
      });
    } else {
      // it formats the date input to display the forward slashes in DD/MM/YYYY
      let dateInput = e.target.value.split('');
      let formattedInput = [];
      // if the user deletes a '/', then the previous number is deleted as well
      if (dateInput.length < props.formData.dateInput.length && props.formData.dateInput[props.formData.dateInput.length - 1] === '/') {
        dateInput.pop();
        formattedInput = dateInput;
      } else {
        dateInput = dateInput.filter(element => element !== '/');
        dateInput.forEach((element, idx) => {
          formattedInput.push(element);
          if (idx === 1 || idx === 3) {
            formattedInput.push('/');
          };
        });
      };
      dateInput = formattedInput.join('');

      // it updates the cursor position if the user edits the input from the beginning to the second last character
      // if the '/' is added, the cursor jumps 1 extra space
      if (dateInput.length - props.formData.dateInput.length === 2) {
        setCursorPosition(e.target.selectionStart + 1);
      } else {
        setCursorPosition(e.target.selectionStart);
      };

      if (dateInput.length === 10) {
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
      } else if (dateInput.length === 6) {
        const [day, month] = dateInput.split('/');
        let date = dateInput.split('/').reverse().join('-');
        date = '2024' + date;
        props.setFormData({
          ...props.formData,
          [e.target.name]: dateInput,
          day: Number(day),
          month: Number(month),
          year: null,
          date: date,
        });
      } else {
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
    // console.log(props.formData);
  }, [props.formData.dateInput, cursorPosition]);


  // -*-*- End: Update Form Data -*-*-


  // -*-*- Start: Name and Date Inputs Validation -*-*-


  const [isFormValid, setIsFormValid] = useState({
    nameValid: false,
    dateValid: false,
  });

  // it validates the name
  useEffect(() => {
    const validateName = () => {
      // nameRegex asserts to have a name input of minimum 2 characters (together or separate) up to 25, excluding whitespaces around them, and does not accept the following characters @#$%^*=+?
      const nameRegex = /^\s*[^\s@#$%^*=+?]{1}\s*[^\s@#$%^*=+?]{1}[^@#$%^*=+?]{0,23}$/;
      const isNameValid = nameRegex.test(props.formData.name);
      return isNameValid;
    };
    setIsFormValid(prevState => {
      return {...prevState, nameValid: validateName()};
    });
  }, [props.formData.name]);

  // it validates the date
  useEffect(() => {
    const validateDate = (inputDate, inputDay) => {
      const newDay = new Date(inputDate).getDate();
      return newDay === inputDay;
    };
    // the first condition checks if the birthday date is valid (either with dd/mm or with dd/mm/yyyy) or if the special event is valid as long as the user inputs dd/mm/yyyy
    if ((props.formData.date &&
      props.formData.event === 'birthday') ||
      (props.formData.year && props.formData.event === 'special')) {
      const result = validateDate(props.formData.date, props.formData.day);
      setIsFormValid(prevState => {
        return {...prevState, dateValid: result};
      });
    } else {
      setIsFormValid(prevState => {
        return {...prevState, dateValid: false};
      });
    };
  }, [props.formData.date, props.formData.day, props.formData.year, props.formData.event]);

  // this function compares the data when the user wants to update an event, if there is no change, the update button will be disabled
  const [originalData] = useState(props.formData);
  const compareData = () => {
    if (
      props.type === 'update' && 
      props.formData.event === originalData.event && 
      props.formData.name === originalData.name && 
      props.formData.date === originalData.date
      ) {
        return false;
      };
    return true;
  };

  // -*-*- End: Name and Date Inputs Validation -*-*-


  // it controls the blur of each input to show an error message when the user does not type the expect input
  const [outOfFocus, setOutOfFocus] = useState({name: false, dateInput: false});
  const handleOnBlur = event => {
    const eventName = event.target.name;
    if (props.formData[eventName].length === 0) {
      setOutOfFocus(prevState => {
        return {...prevState, [eventName]: false};
      });
    } else {
      setOutOfFocus(prevState => {
        return {...prevState, [eventName]: true};
      });
    };
  };
  
  // it removes the focus of the inputs when the user opens the update modal
  useEffect(() => {
    if(props.type === 'update') {
      document.getElementById('name-input').blur();
      document.getElementById('date-input').blur();
    }
  }, [props.type]);

  const handleForm = event => {
    props.handleForm(event, props.formData, originalData);
  };
  
  // this useEffect determines the nameErrorMsg according to the user input
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  useEffect(() => {
    !isFormValid.nameValid && props.formData.name.trim().length < 2 ?
      setNameErrorMsg('The name must be at least 2 characters long')
    : setNameErrorMsg('The name contains invalid characters: @#$%^*=+?');
  }, [isFormValid.nameValid, props.formData.name]);

  return (
      <form id='event-form' onSubmit={handleForm} autoComplete='off'>
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
          <input type='text' name='name' id='name-input' minLength='2' maxLength='25' value={props.formData.name} onChange={updateFormData} placeholder='John Smith' required onBlur={handleOnBlur} autoFocus />
          <span className={
            `material-symbols-outlined checker ${
              isFormValid.nameValid ? 'valid'
              : !isFormValid.nameValid && outOfFocus.name ? 'invalid'
              : ''
            }`
          }>
            {isFormValid.nameValid ? 'check' : 'close'}
          </span>
          <div className='input-info'>
            <p className={!isFormValid.nameValid && outOfFocus.name ? 'error-msg' : 'error-msg hide-error-msg'}>
              {nameErrorMsg}
            </p>
            <p>{props.formData.name.length}/25</p>
          </div>
        </fieldset>

        <fieldset className='form-input-container'>
          <label htmlFor='date-input'>Date</label>
          <input type='text' name='dateInput' id='date-input' min-length='5' maxLength='10' value={props.formData.dateInput} onChange={updateFormData} inputMode='numeric' placeholder='dd/mm/yyyy' required onBlur={handleOnBlur} />
          <span className={
            `material-symbols-outlined checker ${
              isFormValid.dateValid ? 'valid' 
              : !isFormValid.dateValid && outOfFocus.dateInput ? 'invalid' 
              : ''
            }`}>
            {isFormValid.dateValid ? 'check' : 'close'}
          </span>
          <div className='input-info'>
            <p className={!isFormValid.dateValid && outOfFocus.dateInput ? 'error-msg' : 'error-msg hide-error-msg'}>
              The date must be in the format dd/mm/yyyy
            </p>
          </div>
        </fieldset>
        
        <button type='submit' id='save-date' disabled={!isFormValid.nameValid || !isFormValid.dateValid || !compareData()}>
          {props.btnTag}
        </button>
      </form>
  );
};

export default EventForm;