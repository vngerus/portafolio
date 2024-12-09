
import { Header, Hero, About, Projects, Experiences, Contact, Footer } from '@/sections';

export default function Home() {
  return (
    <div className=" min-h-screen text-white bg-background
">
      <Header />
      <Hero />
      <Experiences />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
