import { useState } from 'react';
import '../assets/styles/Header.css';
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
      <p id='logo'>Cookies
        <span>& Dates</span>
      </p>
      <div className='user'>
        <p>{today}</p>
        <button id='menu-icon' className={openMenu ? 'menu-icon-active' : ''} onClick={handleClick}></button>
      </div>
    </header>
  );
};

export default Header;
