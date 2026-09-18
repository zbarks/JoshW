import React from 'react';
import { BookButton } from '../components/BookLinks';

const AboutMe: React.FC = () => {
  const portraitUrl = 'https://e0.365dm.com/11/11/800x600/113557643_2679459.jpg?20111117143518';

  return (
    <div className="bg-brandBlack">
      <section className="section">
        <div className="container-page grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <img
            src={portraitUrl}
            alt="Josh Walker, former England Youth International and founder of Foot Forward Edinburgh"
            width={800}
            height={1000}
            className="aspect-[4/5] w-full rounded-2xl border border-white/10 object-cover"
          />
          <div>
            <p className="kicker">The founder</p>
            <h1 className="display mb-8 whitespace-nowrap text-[clamp(2.5rem,7vw,4.5rem)] text-white">Josh Walker</h1>
            <p className="mb-6 text-xl leading-relaxed text-neutral-200">
              As an ex England Youth International, I've lived and breathed football at the highest levels of the game for over a decade. Playing in professional environments for 10+ years taught me what it truly takes to succeed.
            </p>
            <p className="mb-10 text-lg leading-relaxed text-neutral-400">
              Now, as a UEFA licensed coach, I've dedicated the last 4+ years to building Edinburgh's leading football academy. My mission is to translate professional standards into actionable development for young players.
            </p>
            <dl className="mb-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div className="flex flex-col-reverse"><dt className="text-sm text-neutral-400">Years pro experience</dt><dd className="display text-4xl text-white">10+</dd></div>
              <div className="flex flex-col-reverse"><dt className="text-sm text-neutral-400">Licensed coach</dt><dd className="display text-4xl text-white">UEFA</dd></div>
            </dl>
            <BookButton where="about" />
          </div>
        </div>
      </section>

      <section className="section bg-white text-brandBlack">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="kicker">Elite standards</h2>
          <div className="space-y-8">
            <blockquote className="font-heading text-2xl font-bold leading-snug md:text-3xl">"Every player has a different path, but they all deserve the same belief."</blockquote>
            <blockquote className="font-heading text-2xl font-bold leading-snug md:text-3xl">"I will believe in you every step of the way."</blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
