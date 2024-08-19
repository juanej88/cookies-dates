import '../assets/styles/Nav.css';
import ActionButton from './ActionButton';

const Nav = props => {
  return (
    <nav id='action-buttons'>
      <ActionButton id='add-event' className='add-event-btn' handleClick={props.updateModal}>
        <span className="material-symbols-outlined">
          add
        </span>
      </ActionButton>
      <ActionButton id='menu' className='menu-btn' handleClick={props.toggleDisplayMenu}>
        <span 
          className={`menu-icon ${props.displayMenu ? 'menu-icon-active' : ''}`}
        ></span>
      </ActionButton>
    </nav>
  );
};

export default Nav;
