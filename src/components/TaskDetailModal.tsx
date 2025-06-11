'use client';
import { Task } from './TaskCard'; // Import the Task type

// This component receives the selected task and a function to close itself.
export const TaskDetailModal = ({ task, onClose }: { task: Task | null; onClose: () => void; }) => {
  // If no task is selected, the component renders nothing.
  if (!task) return null;

  return (
    // The modal backdrop: a semi-transparent overlay that covers the page.
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose} // Clicking the backdrop closes the modal.
    >
      {/* The modal content itself. `onClick` with `stopPropagation` prevents clicks inside from closing it. */}
      <div 
        className="bg-background rounded-lg border-2 border-foreground border-b-8 p-8 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
            <div>
                <span className="bg-foreground text-background px-3 py-1 font-bold rounded-md text-sm">{task.category}</span>
                <h2 className="font-display text-5xl text-foreground mt-2">{task.title}</h2>
            </div>
            <button onClick={onClose} className="text-4xl text-subtle-text hover:text-primary">&times;</button>
        </div>

        <div className="flex items-center space-x-3 mt-4">
            <img src={task.profiles?.avatar_url || `https://placehold.co/40x40/F5ECD5/3D3D3D?text=${task.profiles?.first_name?.[0] || 'U'}`} alt="user avatar" className="w-10 h-10 rounded-full border-2 border-border"/>
            <div>
                <p className="font-bold text-foreground">Posted by {task.profiles?.first_name || 'A User'}</p>
                <p className="text-xs text-subtle-text">on {new Date(task.created_at).toLocaleDateString()}</p>
            </div>
        </div>

        <p className="text-subtle-text font-medium mt-6">{task.description}</p>
        
        <div className="mt-8 pt-6 border-t-2 border-border flex justify-between items-center">
            <div>
                <p className="text-subtle-text font-bold">PIZZA PAYOUT</p>
                <p className="font-display text-4xl text-primary">🍕 {task.payout} {task.payout > 1 ? 'Pizzas' : ''}</p>
            </div>
            <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold border-b-4 border-primary-hover">
                I'll Do It For Pizza!
            </button>
        </div>
      </div>
    </div>
  );
};