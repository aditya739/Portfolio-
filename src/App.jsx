import './App.css';
import Contact from './sections/Contact/Contact';
import Footer from './sections/Footer/Footer';
import Hero from './sections/Hero/Hero';
import Projects from './sections/Projects/Projects';
import Skills from './sections/Skills/Skills';
import Navbar from './sections/Navbar/Navbar';
import Achievements from './sections/Achievements/Achievements';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
