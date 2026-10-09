import type { Metadata } from 'next';
import Link from 'next/link';
import { workCompanies } from '@/data';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import ProjectArchive from '@/components/ProjectArchive';

export const metadata: Metadata = { title: 'Proyectos - Ángel Smith' };

export default function ProyectosPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-280 px-[clamp(20px,4vw,40px)] pt-[clamp(28px,5vw,56px)] pb-[clamp(48px,8vw,96px)]">
        <Link
          href="/"
          className="font-jetbrains text-xs tracking-[0.06em] text-muted transition-colors hover:text-accent"
        >
          ← Inicio
        </Link>
        <ProjectArchive companies={workCompanies} />
      </main>
      <Footer />
    </>
  );
}
