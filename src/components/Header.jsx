import '../assets/styles/Header.css';

const Header = () => {
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  };
  const date = new Date().toLocaleString(undefined, options);

  return(
    <header>
      <h1>Cookies<span>& Dates</span></h1>
      <div className='date'><h3>{date}</h3></div>
      <div className='user'>
        <h3>Juan</h3>
        <div className='cookie'></div>
      </div>
    </header>
  );
};

export default Header;
