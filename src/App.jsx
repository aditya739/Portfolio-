import './App.css';
import Contact from './sections/Contact/Contact';
import Footer from './sections/Footer/Footer';
import Hero from './sections/Hero/Hero';
import Projects from './sections/Projects/Projects';
import Skills from './sections/Skills/Skills';
import Navbar from './sections/Navbar/Navbar';
import Achievements from './sections/Achievements/Achievements';
import Experience from './sections/Experience/Experience';
import AdminPanel from './sections/Admin/AdminPanel';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
      <Footer />
      <AdminPanel />
    </>
  );
}

export default App;
