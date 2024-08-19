import { useState } from 'react';
import '../assets/styles/Header.css';
import Nav from './Nav';
import Menu from './Menu';
import React from 'react';

const Header = props => {
  const options = {weekday: 'short', day: '2-digit', month: 'short'};
  const today = new Date().toLocaleString(undefined, options);

  const [displayMenu, setDisplayMenu] = useState(false);

  const toggleDisplayMenu = () => {
    setDisplayMenu(prevState => !prevState);
  };
  
  return(
    <header>
      <a id='logo' href='./'>Cookies
        <span>& Dates</span>
      </a>
      <div className='menu-container'>
        <p>{today}</p>
        <Nav updateModal={props.updateModal} displayMenu={displayMenu} toggleDisplayMenu={toggleDisplayMenu} />
        {displayMenu && <Menu />}
      </div>
    </header>
  );
};

export default Header;
