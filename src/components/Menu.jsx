import '../assets/styles/Menu.css';

const Menu = props => {
  return (
    <section className='menu-modal'>
      <article className='menu-options-container'>
        <button id='log-out-btn'>
          Log out
          <span class="material-symbols-outlined">logout</span>
        </button>
      </article>
    </section>
  );
};

export default Menu;