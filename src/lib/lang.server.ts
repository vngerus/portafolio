import { headers } from 'next/headers';
import { pickLang, type Lang } from '@/lib/lang';

export async function getLang(): Promise<Lang> {
  return pickLang((await headers()).get('accept-language'));
}
