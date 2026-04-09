import Head from 'next/head';
import '../styles/globals.css';

export const metadata = {
  title: 'SAR Portal | FinCEN',
  description: 'Suspicious Activity Reporting System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
      </Head>
      <body>{children}</body>
    </html>
  );
}