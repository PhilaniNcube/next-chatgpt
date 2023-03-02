import './globals.css'
import {League_Spartan} from '@next/font/google'

const spartan = League_Spartan({
  display: 'swap',
  preload: true,
  subsets: ['latin'],
  weight: ['100', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={spartan.className} lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  );
}
