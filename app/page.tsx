import PromptForm from '@/components/PromptForm'
import Image from 'next/image'
import { Fragment } from 'react';
import HomePageHero from './HomePageHero';




export default function Home() {
  return (
    <Fragment>
      <HomePageHero />
      <main className="max-w-7xl mx-auto py-2">
        <PromptForm />
      </main>
    </Fragment>
  );
}
