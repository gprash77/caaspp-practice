import type { Metadata } from 'next';
import Studies from './studies';
export const metadata: Metadata = { title: 'School Studies · Science & California History', description: 'Family teaching guides and practice for grade 4/5 science and California social studies.' };
export default function Page() { return <Studies />; }
