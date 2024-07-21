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

  const updateFormData = (e) => {
    if (e.target.name ==='day' && props.formData.month) {
      const year = new Date().getFullYear();
      const newDate = `${year}-${props.formData.month}-${e.target.value}`;
      props.setFormData({
        ...props.formData,
        [e.target.name]: e.target.value,
        date: newDate,
      });
    } else if(e.target.name === 'month' && props.formData.day) {
      const year = new Date().getFullYear();
      const newDate = `${year}-${e.target.value}-${props.formData.day}`;
      props.setFormData({
        ...props.formData,
        [e.target.name]: e.target.value,
        date: newDate,
      });
    } else {
      props.setFormData({
        ...props.formData,
        [e.target.name]: e.target.value,
      });
    };
    
  };

  const [isFormInvalid, setIsFormInvalid] = useState(true);

  useEffect(() => {
    props.formData.name && props.formData.date ? setIsFormInvalid(false)
    : setIsFormInvalid(true);
  }, [props.formData.name, props.formData.date]);

  const getDays = () => {
    const daysElements = [<option key='no-day' value=''></option>];
    for(let i = 1; i <= 31; i++) {
      const num = i < 10 ? `0${i}` : i;
      daysElements.push(<option key={num} value={num}>{i}</option>);
    };
    return daysElements;
  };

  const getMonths = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthsElements = months.map((month, idx) => {
      const num = idx < 9 ? `0${idx + 1}` : idx + 1
      return <option key={num} value={num}>{month}</option>;
    });
    monthsElements.unshift(<option key='no-month' value=''></option>);
    return monthsElements;
  };

  //it renders if the user selects Special Event
  const getFutureYears = () => {
    const yearsElements = [];
    const year = new Date().getFullYear();
    for(let i = year + 4; i >= year + 1; i--) {
      const num = i < 10 ? `0${i}` : i;
      yearsElements.push(<option key={num} value={num}>{i}</option>);
    };
    return yearsElements;
  };

  const getPrevYears = () => {
    const yearsElements = [<option key='no-day' value=''></option>];
    const year = new Date().getFullYear();
    for(let i = year; i >= year - 122; i--) {
      const num = i < 10 ? `0${i}` : i;
      yearsElements.push(<option key={num} value={num}>{i}</option>);
    };
    return yearsElements;
  };

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

        <fieldset className='form-name-container'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' id='name' minLength='2' maxLength='25' value={props.formData.name} onChange={updateFormData} required autoFocus />
          <span className='material-symbols-outlined valid'>check</span>
        </fieldset>
        
        <fieldset className='date-container'>
          <div className='date-partition-container'>
            <label htmlFor='day'>Day</label>
            <select name='day' id='day' value={props.formData.day} onChange={updateFormData} required>
              {getDays()}
            </select>
            <span className='material-symbols-outlined valid'>check</span>
          </div>

          <div className='date-partition-container'>
            <label htmlFor='month'>Month</label>
            <select name='month' id='month' value={props.formData.month} onChange={updateFormData} required>
              {getMonths()}
            </select>
            <span className='material-symbols-outlined valid'>check</span>
          </div>

          <div className='date-partition-container'>
            <label htmlFor='year'>Year</label>
            <select name='year' id='year' value={props.formData.year} onChange={updateFormData} required>
              {props.formData.event === 'special' && getFutureYears()}
              {getPrevYears()}
            </select>
            <span className='material-symbols-outlined valid'>check</span>
          </div>
        </fieldset>

        <button type='submit' id='save-date' disabled={isFormInvalid}>
          Add
        </button>
      </form>
    </section>
  );
};

export default Modal;