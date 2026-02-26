
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const logoUrl = "https://images.squarespace-cdn.com/content/v1/6347f13be3c69c5db5a7394f/9051e63e-e492-4263-8522-45cd791b967c/d98634da-d16b-4742-a66d-f153c34045c6__2_-removebg-preview.png?format=1500w";

  return (
    <footer className="bg-brandBlack pt-20 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Brand Info */}
          <div>
            <img src={logoUrl} alt="Foot Forward Edinburgh" className="h-20 w-auto mb-8" />
            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-bold uppercase tracking-tight">
              Edinburgh's Leading Football Academy. Professional standards for every player. Managed by Josh Walker.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-brandRed transition-colors"><Instagram size={28} /></a>
              <a href="#" className="text-gray-500 hover:text-brandRed transition-colors"><Facebook size={28} /></a>
              <a href="#" className="text-gray-500 hover:text-brandRed transition-colors"><Twitter size={28} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-white mb-8 uppercase italic tracking-[0.3em] text-brandRed text-xs">DIRECT LINKS</h4>
            <ul className="space-y-4">
              <li><Link to="/what-we-do" className="text-gray-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest italic">What We Do</Link></li>
              <li><Link to="/academy" className="text-gray-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest italic">Academy</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest italic">About Me</Link></li>
              <li><Link to="/reviews" className="text-gray-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest italic">Reviews</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest italic">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-black text-white mb-8 uppercase italic tracking-[0.3em] text-brandRed text-xs">CONTACT</h4>
            <ul className="space-y-6">
              <li className="flex items-center space-x-4 text-sm">
                <Mail size={20} className="text-brandRed" />
                <a href="mailto:footforwardcoaching@gmail.com" className="text-gray-400 hover:text-white transition-colors font-black uppercase tracking-tight">
                  footforwardcoaching@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-4 text-sm">
                <Phone size={20} className="text-brandRed" />
                <a href="tel:07521484647" className="text-gray-400 hover:text-white transition-colors font-black uppercase tracking-tight">
                  07521484647
                </a>
              </li>
              <li className="flex items-center space-x-4 text-sm">
                <MapPin size={20} className="text-brandRed" />
                <span className="text-gray-400 font-black uppercase tracking-tight uppercase">GEORGE WATSON'S COLLEGE, EDINBURGH</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">
          <p>© 2024 Foot Forward Coaching - Edinburgh football academy</p>
          <a 
  href="https://www.barkerdigital.co.uk/" 
  target="_blank" 
  rel="noopener noreferrer"
  className="mt-4 md:mt-0"
>
  DESIGNED BY BARKER DIGITAL.
</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
