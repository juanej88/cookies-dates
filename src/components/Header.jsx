import '../assets/styles/Header.css';

const Header = () => {
  return(
    <header>
      <p id='logo'>Cookies
        <span>& Dates</span>
      </p>
      <div className='user'>
        <p>Juan</p>
        <span className='material-symbols-outlined'>cookie</span>
      </div>
    </header>
  );
};

export default Header;
