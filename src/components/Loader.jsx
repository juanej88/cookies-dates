import { useEffect, useState } from 'react';
import '../assets/styles/Loader.css';

const Loader = () => {
  const [image, setImage] = useState(1);

  useEffect(() => {
    const swapImages = () => {
      switch(image) {
        case 1:
          setImage(2);
          break;
        case 2:
          setImage(3);
          break;
        case 3:
          setImage(4);
          break;
        default:
          setImage(1);
      };
    };

    const imgInterval = setInterval(() => {
      swapImages();
    }, 500);

    return () => clearInterval(imgInterval);
  }, [image]);
  
  
  return (
    <section id='loader'>
      <span className={`loader-img loader-img-${image}`}></span>
    </section>
  );
};

export default Loader;