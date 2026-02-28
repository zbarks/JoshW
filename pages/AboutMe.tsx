
import React from 'react';

const AboutMe: React.FC = () => {
  const portraitUrl = "https://e0.365dm.com/11/11/800x600/113557643_2679459.jpg?20111117143518";

  return (
    <div className="pt-24 bg-brandBlack">
      <section className="py-24 bg-brandBlack px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-4 border-brandRed rounded-2xl"></div>
              <img 
                src={portraitUrl} 
                alt="Josh Walker" 
                className="relative z-10 w-full rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 border border-white/10 shadow-2xl object-cover aspect-[4/5]"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-brandRed font-black tracking-widest uppercase mb-4 italic">The Founder</h2>
            <h1 className="font-heading font-black text-5xl md:text-7xl mb-8 leading-none uppercase italic">Josh Walker</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-6 font-medium">
              As an ex England Youth International, I've lived and breathed football at the highest levels of the game for over a decade. 
              Playing in professional environments for 10+ years taught me what it truly takes to succeed.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed mb-10 font-medium">
              Now, as a UEFA licensed coach, I've dedicated the last 4+ years to building Edinburgh's leading football academy. 
              My mission is to translate professional standards into actionable development for young players.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="border-l-4 border-brandRed pl-4">
                <p className="text-4xl font-black mb-1 text-white">10+</p>
                <p className="text-gray-500 uppercase text-xs tracking-widest font-bold">Years Pro Experience</p>
              </div>
              <div className="border-l-4 border-brandRed pl-4">
                <p className="text-4xl font-black mb-1 text-white">UEFA</p>
                <p className="text-gray-500 uppercase text-xs tracking-widest font-bold">Licensed Coach</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white text-brandBlack px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-black mb-12 uppercase italic">Elite Standards</h2>
          <div className="space-y-8 text-xl text-gray-700 italic font-bold uppercase tracking-tight">
            <p>"Every player has a different path, but they all deserve the same belief."</p>
            <p>"I will believe in you every step of the way."</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
