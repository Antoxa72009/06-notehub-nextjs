import type { Metadata } from 'next';
import './styles/globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import 'modern-normalize/modern-normalize.css';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'A simple note-taking application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <TanStackProvider>
          <main>
            {children}
          </main>
        </TanStackProvider>
        <Footer />
        <div id="modal-root" />
      </body>
    </html>
  );
}