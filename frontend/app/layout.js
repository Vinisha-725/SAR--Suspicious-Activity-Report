import '../styles/globals.css';

export const metadata = {
  title: 'SAR Portal | FinCEN',
  description: 'Suspicious Activity Reporting System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}