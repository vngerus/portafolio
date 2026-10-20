import type { Metadata } from 'next';
import { ui } from '@/data';
import { getLang } from '@/lib/lang.server';
import CvView from './CvView';

export async function generateMetadata(): Promise<Metadata> {
  return { title: ui[await getLang()].cv.metaTitle };
}

export default function CvPage() {
  return <CvView />;
}
