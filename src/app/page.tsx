import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { RecentTasks } from '@/components/RecentTasks';
import { Footer } from '@/components/Footer';

// The Home component is now incredibly clean and readable.
export default function Home() {
  return (
    // We set the main background color here, which covers the whole page.
    <div className="bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <RecentTasks />
      </main>
      <Footer />
    </div>
  );
}