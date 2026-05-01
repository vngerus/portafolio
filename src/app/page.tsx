import Signature from '@/components/signature';
import Socials from '@/components/socials';
import { Header, Hero, About, Projects, Experiences, Contact, Footer } from '@/sections';

export default function Home() {
  return (
    <div className="relative flex min-h-screen text-white bg-background">
      <div className="hidden md:block">
        <Socials />
      </div>

      <main className="flex-1 mx-auto max-w-[1200px] px-4">
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
