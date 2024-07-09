import '../assets/styles/Footer.css';

const Footer = () => {
  const getYear = () => new Date().getFullYear();

  return(
    <footer>
      <div>
        <p>Copyright &#xa9; {getYear()} Cookies & Dates</p>
      </div>
      <div>
        <p>
          Made by <a 
          href='https://juanespinosa.netlify.app/'
          target='_blank'
          rel="noreferrer"
          title="Visit Juan's Portfolio"
          >
            Juan Espinosa Jorrin
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
