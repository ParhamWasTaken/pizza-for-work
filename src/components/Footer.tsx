export const Footer = () => {
  return (
    <footer className="border-t border-border mt-24">
      <div className="container mx-auto text-center py-8">
        <p className="text-subtle-text">
          © {new Date().getFullYear()} OnePizza.wtf. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};