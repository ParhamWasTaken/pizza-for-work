'use client';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="text-center">
      {/* Padding is reduced on smaller screens */}
      <div className="container mx-auto py-20 sm:py-24 md:py-32 px-4">
        <div className="space-y-6">
          {/* Font size adjusts based on screen size: text-5xl on mobile, up to text-9xl on desktop */}
          <h1 className="font-display text-5xl sm:text-7xl md:text-9xl text-foreground">
            Trade Skills for Slices
          </h1>
          <p className="text-lg text-subtle-text max-w-2xl mx-auto font-medium">
            A marketplace where your talent is worth more than money—it's worth pizza.
          </p>
        </div>
        {/* Buttons stack vertically on mobile and go side-by-side on larger screens */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/marketplace" className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-lg font-bold border-b-4 border-primary-hover">
            Find a Task
          </Link>
          <Link href="/about-us" className="w-full sm:w-auto bg-background text-foreground px-10 py-4 rounded-lg font-bold border-2 border-b-4 border-foreground">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};