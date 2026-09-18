import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { SITE } from '../config/site';
import { BookButton } from '../components/BookLinks';
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
    <div className="bg-brandBlack">
      <section className="section">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h1 className="display mb-6 text-5xl text-white md:text-7xl">Get in touch</h1>
            <p className="mb-12 text-xl text-neutral-300">Ready to take your game to the next level? Contact us today.</p>

            <ul className="mb-12 space-y-7">
              {[
                { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
                { icon: Phone, label: 'Phone', value: SITE.phoneDisplay, href: SITE.phoneHref },
                { icon: MapPin, label: 'Location', value: `${SITE.venue}, Edinburgh ${SITE.postcode}` },
              ].map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-brandRed">
                    <Icon size={22} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-neutral-500">{label}</p>
                    {href ? (
                      <a href={href} className="break-words text-lg font-semibold text-white hover:text-brandRed md:text-xl">{value}</a>
                    ) : (
                      <p className="text-lg font-semibold text-white md:text-xl">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-white/10 p-6">
              <p className="mb-4 text-neutral-300">Looking to book a place?</p>
              <BookButton where="contact" />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 text-brandBlack md:p-10">
            <h2 className="mb-8 font-heading text-2xl font-extrabold uppercase">Send a message</h2>

            {status === 'success' && (
              <div role="status" className="mb-6 rounded-xl bg-green-50 p-4 text-green-800">
                <p className="font-semibold">Message sent.</p>
                <p className="text-sm">We'll get back to you soon.</p>
              </div>
            )}
            {status === 'error' && (
              <div role="alert" className="mb-6 rounded-xl bg-red-50 p-4 text-red-800">
                <p className="font-semibold">Your message did not send.</p>
                <p className="text-sm">Please try again or email us directly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="field-label">First name</label>
                  <input id="firstName" type="text" name="firstName" autoComplete="given-name" value={formData.firstName} onChange={handleChange} required className="field" />
                </div>
                <div>
                  <label htmlFor="lastName" className="field-label">Last name</label>
                  <input id="lastName" type="text" name="lastName" autoComplete="family-name" value={formData.lastName} onChange={handleChange} required className="field" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="field-label">Email</label>
                <input id="email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required className="field" />
              </div>
              <div>
                <label htmlFor="message" className="field-label">Message</label>
                <textarea id="message" rows={5} name="message" value={formData.message} onChange={handleChange} required className="field" />
              </div>
              <button type="submit" disabled={status === 'sending'} className="btn-primary w-full bg-brandBlack py-4 hover:bg-brandRed disabled:opacity-50">
                {status === 'sending' ? 'Sending…' : 'Send message'} <Send size={18} aria-hidden />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="h-[380px] w-full border-t border-white/10">
        <iframe
          title="Map showing George Watson's College, Edinburgh"
          src="https://www.google.com/maps?q=George+Watson%27s+College,+Colinton+Rd,+Edinburgh+EH10+5EG&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(1) invert(0.92)' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
};

export default Contact;
