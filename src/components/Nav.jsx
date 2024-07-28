import { useState } from 'react';
import '../assets/styles/Nav.css';
import ActionButton from './ActionButton';

const Nav = props => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const openMenu = () => {
    setDisplayMenu(prevState => !prevState);
  };

  return (
    <nav id='action-buttons'>
      <ActionButton className='add-event-btn' handleClick={props.toggleModal}>
        <span className="material-symbols-outlined">
          add
        </span>
      </ActionButton>
      <ActionButton className='menu-btn' handleClick={openMenu}>
        <span 
          className={`menu-icon ${displayMenu ? 'menu-icon-active' : ''}`}
        ></span>
      </ActionButton>
    </nav>
  );
};

export default Nav;
