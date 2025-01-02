
import Signature from '@/components/signature';
import Socials from '@/components/socials';
import { Header, Hero, About, Projects, Experiences, Contact, Footer } from '@/sections';
import CatModel from './CatModel';


export default function Home() {
  return (
    <div className="relative flex min-h-screen text-white bg-background">
      <div className="hidden md:flex flex-col items-center justify-center fixed left-0 top-0 h-full w-[50px]">
        <div className="flex flex-col gap-4">
          <Socials />
        </div>
      </div>

      <div className="flex-1 mx-auto max-w-[1200px] px-4">
        <Header />
        <CatModel />
        <Hero />
        <Experiences />
        <Projects />
        <About />
        <Contact />
        <Footer />
      </div>

      <div className="hidden md:flex flex-col items-center justify-center fixed right-0 top-0 h-full w-[50px]">
        <Signature />

      </div>
    </div>
  );
}
