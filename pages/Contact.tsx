import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const result = await emailjs.send(
        'service_vigjre8',           // Your Service ID
        'template_addarhw',          // Your Template ID
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          message: formData.message,
        },
        'InEbaMpbzoTsL8cGU'          // Your Public Key
      );

      console.log('Email sent successfully:', result.text);
      setStatus('success');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Email send failed:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

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
              
              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                  <p className="font-bold">Message sent successfully!</p>
                  <p className="text-sm">We'll get back to you soon.</p>
                </div>
              )}
              
              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                  <p className="font-bold">Oops! Something went wrong.</p>
                  <p className="text-sm">Please try again or email us directly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2">Message</label>
                  <textarea 
                    rows={4} 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-brandBlack text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-brandRed transition-all uppercase italic tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'SENDING...' : 'SEND'} <Send size={20} />
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