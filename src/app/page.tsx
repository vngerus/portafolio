
import { Header, Hero, About, Projects, Experiences, Contact, Footer } from '@/sections';

export default function Home() {
  return (
    <div className=" min-h-screen text-white">
      <Header />
      <Hero />
      <About />
      <Experiences />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
