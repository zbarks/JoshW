
import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-24 bg-brandBlack">
      <section className="py-24 bg-brandBlack px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Details */}
            <div>
              <h1 className="font-heading font-black text-5xl md:text-7xl mb-8 uppercase italic">Get In Touch</h1>
              <p className="text-xl text-gray-400 mb-12 font-bold">
                Ready to take your game to the next level? Contact us today.
              </p>

              <div className="space-y-8">
                <div className="flex items-center space-x-6 group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brandRed group-hover:bg-brandRed group-hover:text-white transition-all">
                    <Mail size={32} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-black tracking-widest">Email</p>
                    <a href="mailto:footforwardcoaching@gmail.com" className="text-xl md:text-2xl font-black text-white hover:text-brandRed transition-colors">
                      footforwardcoaching@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-6 group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brandRed group-hover:bg-brandRed group-hover:text-white transition-all">
                    <Phone size={32} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-black tracking-widest">Phone</p>
                    <a href="tel:07521484647" className="text-xl md:text-2xl font-black text-white hover:text-brandRed transition-colors">
                      07521484647
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brandRed">
                    <MapPin size={32} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-black tracking-widest">Location</p>
                    <p className="text-xl md:text-2xl font-black text-white">Edinburgh, Scotland</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-3xl p-8 md:p-12 text-brandBlack shadow-2xl border-t-8 border-brandRed">
              <h2 className="text-3xl font-black mb-8 uppercase italic">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2">First Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2">Last Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2">Email</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2">Message</label>
                  <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed"></textarea>
                </div>
                <button className="w-full bg-brandBlack text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-brandRed transition-all uppercase italic tracking-widest">
                  SEND <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="h-[400px] w-full bg-brandBlack border-t border-white/5">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d143000.00000000000!2d-3.188267!3d55.953252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4887b800a5982623%3A0x64f2147b7ce71727!2sEdinburgh!5e0!3m2!1sen!2suk!4v1715000000000!5m2!1sen!2suk" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(1) invert(1)' }} 
            allowFullScreen={true} 
            loading="lazy"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
