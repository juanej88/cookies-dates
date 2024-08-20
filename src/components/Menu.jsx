import '../assets/styles/Menu.css';

const Menu = props => {
  return (
    <section id='menu-options-container' className={`${props.displayMenu === null ? '' : props.displayMenu ? 'display-menu' : 'hide-menu'}`}>
      <button id='log-out-btn'>
        Log out
        <span class="material-symbols-outlined">logout</span>
      </button>
    </section>
  )
};

export default Menu;