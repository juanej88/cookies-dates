import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Nav from './components/Nav';
import Footer from './components/Footer';
import futureEvents from './assets/helper_functions/futureEvents';

const App = () => {
  const [eventsObj] = useState(futureEvents);

  return (
    <div className="App">
      <Header />
      <Main eventsObj={eventsObj} /> 
      <Nav />
      <Footer />
    </div>
  );
}

export default App;
