export const FireAnimation = () => {
  // A helper function to generate random delays and scales for a more organic look
  const createFlame = (delay: string, scale: number, color: string, left: string) => (
    <div
      className={`absolute bottom-0 w-16 h-24 rounded-t-full ${color} motion-safe:animate-fire`}
      style={{
        animationDelay: delay,
        transform: `scale(${scale})`,
        transformOrigin: 'bottom',
        left: left,
      }}
    />
  );

  return (
    <div className="relative h-24 w-full mt-16 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center w-full">
        {/* Flames are now created using our helper and directly use the animation class */}
        {createFlame('0s', 1, 'bg-primary', '45%')}
        {createFlame('0.5s', 0.8, 'bg-primary', '50%')}
        {createFlame('1s', 1, 'bg-primary', '55%')}
        {createFlame('0.2s', 0.6, 'bg-amber-500', '48%')}
        {createFlame('0.8s', 0.5, 'bg-amber-400', '52%')}
      </div>
    </div>
  );
};
