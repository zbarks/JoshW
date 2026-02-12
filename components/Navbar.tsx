
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Apple, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const logoUrl = "https://images.squarespace-cdn.com/content/v1/6347f13be3c69c5db5a7394f/9051e63e-e492-4263-8522-45cd791b967c/d98634da-d16b-4742-a66d-f153c34045c6__2_-removebg-preview.png?format=1500w";

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'What We Do', path: '/what-we-do' },
    { name: 'Academy', path: '/academy' },
    { name: 'About Me', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-brandBlack/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center">
            <img 
              src={logoUrl} 
              alt="Foot Forward Edinburgh Logo" 
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-black uppercase tracking-widest italic transition-colors ${
                  location.pathname === link.path ? 'text-brandRed' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="https://apps.apple.com/th/app/foot-forward-coaching/id6443740570" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-6 py-3 text-sm font-black uppercase tracking-widest bg-brandRed text-white rounded-full hover:bg-white hover:text-brandBlack transition-all italic"
            >
              <Apple className="mr-2 w-4 h-4" />
              APP
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-24 left-0 w-full bg-brandBlack border-b border-white/5 py-8 px-4 flex flex-col space-y-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-black uppercase tracking-tighter italic ${
                location.pathname === link.path ? 'text-brandRed' : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="https://apps.apple.com/th/app/foot-forward-coaching/id6443740570" 
            className="flex items-center justify-center py-4 bg-brandRed text-white rounded-xl font-black italic uppercase tracking-widest"
          >
            <Apple className="mr-2" /> DOWNLOAD APP
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
