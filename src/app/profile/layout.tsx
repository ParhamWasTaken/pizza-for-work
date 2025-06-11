import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <-- Layout fix for whitespace -->
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      {/* The `flex-grow` class makes this main section expand to fill all available space */}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}