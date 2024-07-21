import '../assets/styles/Nav.css';
import ActionButton from './ActionButton';

const Nav = props => {
  return (
    <nav id='action-buttons'>
      <ActionButton handleClick={props.toggleModal} id='add-event-btn' >
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
  );
};

export default Nav;
