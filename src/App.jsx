import { Footer, Hero, Navbar } from './components';

const App = () => {
  return (
    <main className="max-w-7xl mx-auto ">
      <Navbar />
      <Hero />
      {/*       <About />
      <Experience />
      <Projects /> */}
      <Footer />
    </main>
  );
};

export default App;
