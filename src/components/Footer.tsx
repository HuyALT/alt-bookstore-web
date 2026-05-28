export default function Footer() {
  return (
    <footer className="w-full block bg-surface-container">
      <div className="max-w-7xl mx-auto px-20 py-30 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="font-headline-md text-headline-md text-primary mb-4">
            ALT
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            © 2024 ALT. The Curator’s Library. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300"
            href="#"
          >
            Shipping
          </a>
          <a
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300"
            href="#"
          >
            Returns
          </a>
          <a
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300"
            href="#"
          >
            Privacy
          </a>
          <a
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300"
            href="#"
          >
            Contact
          </a>
          <a
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300"
            href="#"
          >
            Archive
          </a>
        </div>
        <div className="flex gap-6">
          <span className="material-symbols-outlined text-on-secondary-container cursor-pointer hover:text-primary transition-colors">
            public
          </span>
          <span className="material-symbols-outlined text-on-secondary-container cursor-pointer hover:text-primary transition-colors">
            mail
          </span>
          <span className="material-symbols-outlined text-on-secondary-container cursor-pointer hover:text-primary transition-colors">
            history_edu
          </span>
        </div>
      </div>
    </footer>
  );
}
