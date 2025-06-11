'use client';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";

// A small, reusable component for the manifesto cards
const ManifestoCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="bg-background p-8 rounded-lg border-2 border-foreground border-b-8">
        <div className="text-primary mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-border/60">
            {icon}
        </div>
        <h3 className="font-display text-3xl text-center text-foreground">{title}</h3>
        <p className="text-subtle-text text-center mt-2 font-medium">{children}</p>
    </div>
);

// The main About Us Page component
export default function AboutUsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-grow">
                {/* Section 1: Hero - UPDATED TEXT */}
                <section className="text-center py-20 sm:py-32 px-4">
                    <p className="font-display text-2xl text-primary">Our Revolution</p>
                    <h1 className="font-display text-7xl sm:text-8xl md:text-9xl text-foreground mt-2">
                        Join the Counter-Culture.
                    </h1>
                    <p className="text-subtle-text text-xl mt-4 font-medium max-w-3xl mx-auto">
                        In a world obsessed with meaningless metrics, we're starting a rebellion. A movement built on tangible skills, real connections, and the universal truth of a good pizza.
                    </p>
                </section>

                {/* Section 2: The Manifesto */}
                <section className="py-20 sm:py-24 bg-border/60">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <ManifestoCard 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-4.44a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.38"/><path d="M18 14v-4h-4"/><path d="M22 2l-7.5 7.5"/></svg>}
                                title="Talent over Treasure"
                            >
                                Your skill is your capital. Here, a brilliant idea is worth more than a bank balance.
                            </ManifestoCard>
                            <ManifestoCard 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                                title="Community over Currency"
                            >
                                We're building a network of creators and doers who help each other out, one slice at a time.
                            </ManifestoCard>
                             <ManifestoCard 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 13.98Z"/></svg>}
                                title="Good Work for Good Pizza"
                            >
                                A simple, honest exchange. No hidden fees, no complex contracts. Just great work for a great meal.
                            </ManifestoCard>
                        </div>
                    </div>
                </section>
                
                {/* Section 3: The Founder */}
                <section className="py-20 sm:py-32">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            <div className="md:col-span-1">
                                <img 
                                    src="https://placehold.co/400x400/F5ECD5/3D3D3D?text=You!" 
                                    alt="The founder, Parham"
                                    className="rounded-lg border-2 border-foreground border-b-8 w-full"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <p className="font-display text-xl text-primary">The Founder</p>
                                <h2 className="font-display text-6xl text-foreground mt-1">Parham Peyvasteh</h2>
                                <p className="mt-4 text-lg text-subtle-text font-medium">
                                    "I got tired of the endless hustle for money that feels more and more disconnected from real value. I love pizza, and I love seeing cool projects come to life. So I thought, why not combine them? This site is the result of that late-night, pizza-fueled idea. It's a bit of an experiment, a bit of a joke, and hopefully, a lot of fun."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Final Call to Action - REDESIGNED */}
                <section className="bg-border/60 py-20">
                     <div className="container mx-auto px-4 text-center">
                        <h2 className="font-display text-6xl text-foreground">Enough Talk.</h2>
                        <p className="text-subtle-text text-xl mt-2 font-medium">Stop reading and start trading.</p>
                        <Link href="/marketplace" className="mt-8 inline-block bg-primary text-white px-10 py-4 rounded-lg font-bold border-b-4 border-primary-hover">
                            Go to the Marketplace
                        </Link>
                     </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
