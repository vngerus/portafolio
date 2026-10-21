import Header from '@/sections/Header';
import Hero from '@/sections/Hero';
import Experiences from '@/sections/Experiences';
import Projects from '@/sections/Projects';
import About from '@/sections/About';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import ScrollToPending from '@/components/ScrollToPending';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-bone">
      <ScrollToPending />
      <Header />
      <Hero />
      <Experiences />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
