interface FooterProps {
  config: {
    name: string;
  };
}

export function Footer({ config }: FooterProps) {
  return (
    <footer className="py-8 border-t border-slate-800 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="font-semibold mb-4 md:mb-0 text-white">{config.name}</div>
          <div className="text-slate-400 text-sm">
            © 2024 All rights reserved. Built with ❤️ using React & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}
