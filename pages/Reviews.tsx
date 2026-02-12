
import React from 'react';
import { Star, Quote } from 'lucide-react';

const Reviews: React.FC = () => {
  const reviews = [
    {
      name: "Sarah M.",
      role: "Parent of U10 Player",
      text: "Josh's coaching has transformed my son's confidence. Not just in football, but in his day-to-day discipline.",
      rating: 5
    },
    {
      name: "David K.",
      role: "Parent of U14 Player",
      text: "Elite level coaching. The difference between Foot Forward and other academies is the attention to detail. Highly recommend.",
      rating: 5
    },
    {
      name: "James L.",
      role: "Parent of U8 Player",
      text: "Brilliant sessions. The kids love it and you can really see the UEFA coaching standards being applied.",
      rating: 5
    }
  ];

  return (
    <div className="pt-24 bg-brandBlack">
      <section className="py-24 bg-brandBlack text-center px-4">
        <h1 className="font-heading font-black text-5xl md:text-7xl mb-8 uppercase italic">Reviews</h1>
        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="text-brandRed fill-current" size={32} />
          ))}
        </div>
        <p className="text-2xl font-black uppercase tracking-widest">Elite Rated Academy</p>
      </section>

      <section className="py-24 bg-white text-brandBlack px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-gray-50 p-10 rounded-3xl border border-gray-100 relative shadow-sm hover:shadow-xl transition-all">
              <Quote className="absolute top-6 right-8 text-brandRed/10" size={60} />
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="text-brandRed fill-current" size={16} />
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-8 font-medium italic relative z-10">"{review.text}"</p>
              <div>
                <p className="font-black text-brandBlack uppercase italic">{review.name}</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Reviews;
