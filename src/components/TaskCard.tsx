'use client'; // <-- THE FIX IS HERE

// We define the shape of a Task object for type safety.
export type Task = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  category: string;
  payout: number;
  status: string;
  user_id: string;
  profiles: { // This is how we get the poster's info
    first_name: string | null;
    avatar_url: string | null;
  } | null;
};

// The component now accepts an `onCardClick` function as a prop.
export const TaskCard = ({ task, onCardClick }: { task: Task, onCardClick: (task: Task) => void }) => {
  return (
    // We replace the Link with a button to trigger the onClick handler.
    <button onClick={() => onCardClick(task)} className="block group text-left w-full h-full">
      <article className="flex flex-col h-full items-start justify-between border-2 border-foreground bg-background rounded-lg p-6 border-b-8 group-hover:bg-border/60">
        <div>
          <div className="flex items-center gap-x-4 text-sm">
            <span className="relative z-10 bg-foreground text-background px-3 py-1 font-bold rounded-md">
              {task.category}
            </span>
            <div className="text-primary font-bold">
              🍕 {task.payout} {task.payout > 1 ? 'Pizzas' : ''}
            </div>
          </div>
          <div className="relative">
            <h3 className="mt-4 text-3xl font-display text-foreground group-hover:text-primary">
              {task.title}
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-5">
            <img src={task.profiles?.avatar_url || `https://placehold.co/24x24/F5ECD5/3D3D3D?text=${task.profiles?.first_name?.[0] || 'U'}`} alt="user avatar" className="w-6 h-6 rounded-full border-2 border-border"/>
            <p className="text-base font-bold text-subtle-text">by {task.profiles?.first_name || 'A User'}</p>
        </div>
      </article>
    </button>
  );
};