import type { Metadata } from 'next';
import { ui } from '@/data';
import { getLang } from '@/lib/lang.server';
import ProyectosView from './ProyectosView';

export async function generateMetadata(): Promise<Metadata> {
  return { title: ui[await getLang()].archive.metaTitle };
}

export default function ProyectosPage() {
  return <ProyectosView />;
}
