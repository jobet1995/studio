import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Chatbot } from '@/components/shared/chatbot';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  );
}
