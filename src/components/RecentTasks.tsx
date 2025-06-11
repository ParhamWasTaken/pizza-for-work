import { TaskCard } from './TaskCard';

const mockTasks = [
  { id: 1, title: "Design my new podcast logo", category: "Design", payout: 2, user: "dj_streams" },
  { id: 2, title: "Write a short, funny bio for my Tinder profile", category: "Writing", payout: 1, user: "sarah_k" },
  { id: 3, title: "Help me fix a bug in my Python script", category: "Tech", payout: 3, user: "code_ninja" },
  { id: 4, title: "Water my plants for a weekend", category: "Household", payout: 1, user: "plant_lover_99" },
  { id: 5, title: "Draw a cartoon version of my cat", category: "Art", payout: 2, user: "crazycatlady" },
  { id: 6, title: "Edit a 1-minute TikTok video", category: "Video", payout: 1, user: "influencer_wannabe" }
];

export const RecentTasks = () => {
  return (
    <section className="py-24 sm:py-32 bg-border/60">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-6xl sm:text-7xl text-foreground">Latest Tasks</h2>
          <p className="mt-4 text-lg leading-8 text-subtle-text font-medium">
            Find a task that suits you. Get paid in pizza.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {mockTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </section>
  );
};