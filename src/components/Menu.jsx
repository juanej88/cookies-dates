import { useEffect } from 'react';
import '../assets/styles/Menu.css';

const Menu = props => {
  // it closes the menu when the user clicks anywhere on the screen
  useEffect(() => {
    const closeMenu = event => {
      // the following 2 lines are used to prevent the menu to close when the menu-btn is clicked for the first time
      const eventId = event.target.parentNode.id ? event.target.parentNode.id : event.target.id;
      if (eventId !== 'menu') props.toggleDisplayMenu();
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  });
  
  return (
    <section className='menu-modal'>
      <article className='menu-options-container'>
        <button id='log-out-btn'>
          Log out
          <span className="material-symbols-outlined">logout</span>
        </button>
      </article>
    </section>
  );
};

export default Menu; 