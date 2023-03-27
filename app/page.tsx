import PromptForm from '@/components/PromptForm'
import Image from 'next/image'
import { Fragment } from 'react';





export default function Home() {
  return (
    <Fragment>

      <main className="px-3 py-2 mx-auto my-auto lg:px-20 max-w-7xl">
        <h1 className="text-5xl font-medium text-zinc-600">Write your prompt</h1>
        <PromptForm />
      </main>
    </Fragment>
  );
}
