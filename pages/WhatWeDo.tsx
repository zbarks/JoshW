
import React from 'react';
import { Target, Zap, Shield, Heart } from 'lucide-react';

const WhatWeDo: React.FC = () => {
  const services = [
    {
      title: "Technical Excellence",
      icon: <Target className="w-12 h-12 text-brandRed" />,
      description: "Mastering ball control, passing precision, and clinical finishing through professional drills."
    },
    {
      title: "Tactical Intelligence",
      icon: <Zap className="w-12 h-12 text-brandRed" />,
      description: "Understanding the game, positioning, and decision-making on and off the ball."
    },
    {
      title: "Physical Conditioning",
      icon: <Shield className="w-12 h-12 text-brandRed" />,
      description: "Building agility, speed, and strength tailored to young athletes' growth phases."
    },
    {
      title: "Character Building",
      icon: <Heart className="w-12 h-12 text-brandRed" />,
      description: "Developing discipline, teamwork, and resilience to grow as footballers and young adults."
    }
  ];

  return (
    <div className="pt-24 bg-brandBlack">
      <section className="py-20 bg-brandBlack text-center px-4">
        <h1 className="font-heading font-black text-5xl md:text-7xl mb-8 uppercase italic">What We Do</h1>
        <p className="max-w-3xl mx-auto text-xl text-gray-400 leading-relaxed font-bold">
          At Foot Forward, we provide more than just football training. We offer a pathway to elite athletic performance and personal growth.
        </p>
      </section>

      <section className="py-24 bg-white text-brandBlack px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col p-10 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-black mb-4 uppercase italic">{service.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-brandBlack text-white px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-black mb-8 uppercase italic text-brandRed">Our Methodology</h2>
          <p className="text-lg text-gray-300 leading-relaxed font-medium">
            Drawing from Josh Walker's experience in the England Youth International setup, 
            we apply professional academy standards to every session. We believe in high-intensity, 
            focused training while maintaining a supportive environment where players feel confident to take risks.
          </p>
        </div>
      </section>
    </div>
  );
};

export default WhatWeDo;
