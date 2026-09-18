import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { BookButton } from '../components/BookLinks';
import { FAQS } from '../seo/faqs';

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start gap-3">
    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brandRed" aria-hidden />
    <span>{children}</span>
  </li>
);

const Academy: React.FC = () => {
  const facts = [
    { icon: Calendar, label: 'Schedule', value: 'Weekly camps' },
    { icon: Clock, label: 'Membership', value: 'Subscription based' },
    { icon: Users, label: 'Ages', value: 'All groups' },
    { icon: MapPin, label: 'Venue', value: "George Watson's" },
  ];

  return (
    <div className="bg-brandBlack">
      <section className="section pb-16 md:pb-20">
        <div className="container-page">
          <h1 className="display mb-6 text-5xl text-white md:text-7xl">Academy</h1>
          <p className="mb-10 max-w-2xl text-xl leading-relaxed text-neutral-300">
            Elite level coaching. Weekly membership camps. Book your place online.
          </p>
          <BookButton where="academy-hero" link="academy" className="btn-primary px-9 py-4 text-base" />
        </div>
      </section>

      <section className="section bg-white text-brandBlack">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="space-y-16 lg:col-span-2">
            <div>
              <h2 className="mb-5 font-heading text-3xl font-extrabold uppercase">Weekly membership camps</h2>
              <p className="mb-6 text-lg leading-relaxed text-neutral-700">
                Join our elite academy through a <strong>weekly membership subscription</strong>. Train consistently with Josh every week, developing your skills through structured, progressive sessions designed for long-term development.
              </p>
              <ul className="grid gap-3 text-neutral-700 sm:grid-cols-2">
                <Bullet>Regular weekly training sessions</Bullet>
                <Bullet>Flexible membership subscriptions</Bullet>
                <Bullet>Age-appropriate group coaching</Bullet>
                <Bullet>Continuous skill progression tracking</Bullet>
              </ul>
              <BookButton where="academy-membership" link="academy" className="btn-primary mt-8" />
            </div>

            <div className="border-t border-neutral-200 pt-12">
              <h2 className="mb-5 flex items-center gap-3 font-heading text-3xl font-extrabold uppercase">
                <MapPin className="text-brandRed" aria-hidden /> Training location
              </h2>
              <address className="mb-8 not-italic">
                <p className="text-xl font-bold">George Watson's College</p>
                <p className="text-neutral-600">Top Astro Pitch, Colinton Rd, Edinburgh EH10 5EG</p>
              </address>
              <img
                src="https://images.squarespace-cdn.com/content/v1/6347f13be3c69c5db5a7394f/c2292680-3301-4f22-b7b8-4a92b20cc64f/c659d74f-fe49-48be-be8e-35f9ddcdb230.jpg?format=1000w"
                alt="The Top Astro pitch at George Watson's College, Edinburgh, where Foot Forward sessions take place"
                width={1000}
                height={563}
                loading="lazy"
                decoding="async"
                className="aspect-video w-full rounded-2xl object-cover"
              />
            </div>

            <div className="border-t border-neutral-200 pt-12">
              <h2 className="mb-6 font-heading text-3xl font-extrabold uppercase">Questions</h2>
              <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                {FAQS.map((f) => (
                  <details key={f.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                      {f.q}
                      <span className="text-2xl leading-none text-brandRed transition-transform group-open:rotate-45" aria-hidden>+</span>
                    </summary>
                    <p className="mt-3 max-w-2xl leading-relaxed text-neutral-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Booking panel */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-brandBlack p-8 text-white">
              <h2 className="mb-4 font-heading text-2xl font-extrabold uppercase">Join the academy</h2>
              <p className="mb-8 leading-relaxed text-neutral-400">
                Subscribe to weekly membership camps and secure your spot at George Watson's.
              </p>
              <dl className="mb-8 space-y-4 border-y border-white/10 py-6">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="grid grid-cols-[20px_6.5rem_1fr] items-center gap-3">
                    <Icon size={18} className="text-brandRed" aria-hidden />
                    <dt className="text-sm text-neutral-500">{label}</dt>
                    <dd className="text-left font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
              <BookButton where="academy-panel" link="academy" className="btn-primary w-full py-4 text-base" />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Academy;
