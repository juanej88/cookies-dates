import { useState } from 'react';
import '../assets/styles/Header.css';
import ActionButton from './ActionButton';

const Header = () => {
  const options = {weekday: 'short', day: '2-digit', month: 'short'};
  const today = new Date().toLocaleString(undefined, options);
  
  const [openMenu, setOpenMenu] = useState(false);
  const handleClick = () => {
    setOpenMenu(prevState => !prevState);
  };

  return(
    <header>
      <a id='logo' href='./'>Cookies
        <span>& Dates</span>
      </a>
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
