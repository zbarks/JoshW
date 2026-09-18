import React from 'react';
import { Target, Zap, Shield, Heart } from 'lucide-react';
import { BookButton } from '../components/BookLinks';

const services = [
  { title: 'Technical Excellence', icon: Target, description: 'Mastering ball control, passing precision, and clinical finishing through professional drills.' },
  { title: 'Tactical Intelligence', icon: Zap, description: 'Understanding the game, positioning, and decision-making on and off the ball.' },
  { title: 'Physical Conditioning', icon: Shield, description: "Building agility, speed, and strength tailored to young athletes' growth phases." },
  { title: 'Character Building', icon: Heart, description: 'Developing discipline, teamwork, and resilience to grow as footballers and young adults.' },
];

const WhatWeDo: React.FC = () => (
  <div className="bg-brandBlack">
    <section className="section pb-16 md:pb-20">
      <div className="container-page">
        <h1 className="display mb-6 text-5xl text-white md:text-7xl">What we do</h1>
        <p className="max-w-2xl text-xl leading-relaxed text-neutral-300">
          At Foot Forward, we provide more than just football training. We offer a pathway to elite athletic performance and personal growth.
        </p>
      </div>
    </section>

    <section className="section bg-white text-brandBlack">
      <div className="container-page grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
        {services.map(({ title, icon: Icon, description }) => (
          <article key={title} className="border-t-2 border-brandBlack pt-6">
            <Icon size={28} className="mb-5 text-brandRed" aria-hidden />
            <h2 className="mb-3 font-heading text-2xl font-extrabold uppercase">{title}</h2>
            <p className="max-w-md text-lg leading-relaxed text-neutral-600">{description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="section">
      <div className="container-page grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr]">
        <h2 className="display text-4xl text-brandRed">Our methodology</h2>
        <div>
          <p className="mb-10 text-lg leading-relaxed text-neutral-300">
            Drawing from Josh Walker's experience in the England Youth International setup, we apply professional academy standards to every session. We believe in high-intensity, focused training while maintaining a supportive environment where players feel confident to take risks.
          </p>
          <BookButton where="what-we-do" />
        </div>
      </div>
    </section>
  </div>
);

export default WhatWeDo;
