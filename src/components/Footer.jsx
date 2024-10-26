import '../assets/styles/Footer.css';

const Footer = () => {
  const getYear = () => new Date().getFullYear();

  return(
    <footer>
      <div>
        <p>&#xa9; {getYear()} Cookies & Dates</p>
      </div>
      <div>
        <p>
          Developed by <a 
          href='https://juanespinosa.netlify.app/'
          target='_blank'
          rel="noreferrer"
          title="Visit Juan's Portfolio"
          >
            Juan Espinosa
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
