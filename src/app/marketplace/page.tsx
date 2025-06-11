'use client';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TaskCard, Task } from "@/components/TaskCard"; // Import our TaskCard and Task type
import { TaskDetailModal } from "@/components/TaskDetailModal"; // Import the modal
import { FloatingPostButton } from "@/components/FloatingPostButton"; // Import the FAB
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MarketplacePage() {
    // State to hold all tasks fetched from the database
    const [tasks, setTasks] = useState<Task[]>([]);
    // State for the currently selected task to show in the modal
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    // State to manage loading UI
    const [isLoading, setIsLoading] = useState(true);

    // This effect runs once when the component loads to fetch tasks
    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            // This is the Supabase query. It fetches all tasks and the related
            // 'first_name' and 'avatar_url' from the 'profiles' table.
            const { data, error } = await supabase
                .from('tasks')
                .select(`*, profiles (first_name, avatar_url)`)
                .eq('status', 'active') // Only get active tasks
                .order('created_at', { ascending: false }); // Newest first

            if (error) {
                console.error("Error fetching tasks:", error);
            } else {
                setTasks(data || []);
            }
            setIsLoading(false);
        };
        fetchTasks();
    }, []);

    // Handler functions for the modal
    const handleCardClick = (task: Task) => setSelectedTask(task);
    const handleCloseModal = () => setSelectedTask(null);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-grow">
                {/* Page Header */}
                <section className="text-center py-16 sm:py-20 px-4">
                    <h1 className="font-display text-7xl sm:text-8xl text-foreground">The Pizza Board</h1>
                    <p className="text-subtle-text text-xl mt-2 font-medium max-w-2xl mx-auto">
                        Your official source for pizza-powered projects. Find a task, get it done, get paid in pizza.
                    </p>
                </section>

                {/* Control Deck (Filters - to be built out later) */}
                <section className="container mx-auto px-4 mb-8">
                    <div className="bg-border/60 p-4 rounded-lg flex items-center space-x-4">
                        <input 
                            type="text" 
                            placeholder="Search for tasks (e.g. 'logo design')"
                            className="w-full p-3 bg-background border-2 border-foreground rounded-md text-foreground placeholder:text-subtle-text"
                        />
                    </div>
                </section>

                {/* Task Grid */}
                <section className="container mx-auto px-4 pb-24">
                    {isLoading ? (
                        <p className="text-center text-foreground font-bold">Loading tasks...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tasks.map((task) => (
                                <TaskCard key={task.id} task={task} onCardClick={handleCardClick} />
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
            {/* The modal and floating button are placed here, outside the main flow */}
            <TaskDetailModal task={selectedTask} onClose={handleCloseModal} />
            <FloatingPostButton />
        </div>
    );
}
