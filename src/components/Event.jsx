import '../assets/styles/Event.css';
import ActionButton from './ActionButton';

const Event = props => { 
  const getClassName = () => props.show ? 'show-event' : '';
  
  return (
    <aside className={`event-card ${props.event} ${getClassName()}`}>
      <div className='event-container'>
        <span></span>
        <p>{props.name}</p>
      </div>
      <div className='date-container'>
        <p>{props.date}</p>
      </div>
      <div id='more-options-btn' className='more-options-container' onClick={props.openMoreOptions}>
        <span className='material-symbols-outlined'>
          more_vert
        </span>
        <ActionButton id='update-event' className='update-btn' handleClick={props.updateModal} data={props.data}>
          <span className="material-symbols-outlined">
            edit
          </span>
        </ActionButton>
        <ActionButton id='delete-event' className='delete-btn' handleClick={props.updateModal} data={props.data}>
          <span className="material-symbols-outlined">
            delete
          </span>
        </ActionButton>
      </div>
    </aside>
  );
};

export default Event;
