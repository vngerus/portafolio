import Signature from '@/components/signature';
import Socials from '@/components/socials';
import Header from '@/sections/Header';
import Hero from '@/sections/Hero';
import Experiences from '@/sections/Experiences';
import Projects from '@/sections/Projects';
import About from '@/sections/About';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <div className="relative flex min-h-screen text-white bg-background">
      <div className="hidden md:block">
        <Socials />
      </div>

      <main className="flex-1 mx-auto max-w-300 px-4">
        <Header />
        <Hero />
        <Experiences />
        <Projects />
        <About />
        <Contact />
        <Footer />
      </main>

      <div className="hidden md:block">
        <Signature />
      </div>
    </div>
  );
}
