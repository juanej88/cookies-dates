import '../assets/styles/Header.css';
import Nav from './Nav';

const Header = props => {
  const options = {weekday: 'short', day: '2-digit', month: 'short'};
  const today = new Date().toLocaleString(undefined, options);
  
  return(
    <header>
      <a id='logo' href='./'>Cookies
        <span>& Dates</span>
      </a>
      <div className='menu-container'>
        <p>{today}</p>
        <Nav updateModal={props.updateModal} />
      </div>
    </header>
  );
};

export default Header;
