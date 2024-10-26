import ActionButton from './ActionButton';
import '../assets/styles/GetStarted.css';

const GetStarted = props => {
  return (
    <section className='get-started-section'>
      <p>To get started, simply press the 
        <ActionButton id='add-event' className='add-event-btn' handleClick={props.updateModal}>
          <span className="material-symbols-outlined">
            add
          </span>
        </ActionButton> 
        button to create a new event.
      </p>
    </section>
  );
};

export default GetStarted;