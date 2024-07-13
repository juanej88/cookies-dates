import { useState } from 'react';
import '../assets/styles/Header.css';
import ActionButton from './ActionButton';
// import menuIcon1 from '../assets/icons/menuIcon1.svg';

const Header = () => {
  const options = {weekday: 'short', day: '2-digit', month: 'short'};
  const today = new Date().toLocaleString(undefined, options);
  
  const [openMenu, setOpenMenu] = useState(false);
  const handleClick = () => {
    setOpenMenu(prevState => !prevState);
  };

  return(
    <header>
      <div id='logo'>Cookies
        <span>& Dates</span>
      </div>
      <nav className='menu-container'>
        <p>{today}</p>
        <ActionButton id='menu-btn' handleClick={handleClick}>
          <span 
            className={`menu-icon ${openMenu ? 'menu-icon-active' : ''}`}
          ></span>
        </ActionButton>
      </nav>
    </header>
  );
};

export default Header;
