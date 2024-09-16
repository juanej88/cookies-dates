import { useEffect } from 'react';
import '../assets/styles/Menu.css';

const Menu = props => {
  // it closes the menu when the user clicks anywhere on the screen
  useEffect(() => {
    const closeMenu = event => {
      // the following 2 lines are used to prevent the menu to close when the menu-btn is clicked for the first time
      const eventId = event.target.id === 'menu' ? 'menu' : event.target.parentNode.id;
      if (eventId !== 'menu') props.toggleDisplayMenu();
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  });

  const logOutUser = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    props.updateUser(null);
  };
  
  return (
    <section className='menu-modal'>
      <article className='menu-options-container'>
        <button id='log-out-btn' onClick={logOutUser}>
          Log out
          <span className="material-symbols-outlined">logout</span>
        </button>
      </article>
    </section>
  );
};

export default Menu; 