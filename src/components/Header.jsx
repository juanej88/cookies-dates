import { useState } from 'react';
import '../assets/styles/Header.css';
// import menuIcon1 from '../assets/icons/menuIcon1.svg';

const Header = () => {
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
        <p>Juan</p>
        {/* <img id='menu-icon' src={menuIcon1} alt='menu icon' /> */}
        <i id='menu-icon' className={openMenu ? 'menu-icon-active' : ''} onClick={handleClick}></i>

        {/* <span className='material-symbols-outlined'>cookie</span> */}
      </div>
    </header>
  );
};

export default Header;
