import React, { useEffect, useMemo, useState } from 'react';
import { Star, Quote } from 'lucide-react';

type Review = {
  name: string;
  role: string;
  text: string;
  rating: number;
};

const STORAGE_KEY = 'foot-forward-reviews';

const defaultReviews: Review[] = [
  {
    name: 'Sarah M.',
    role: 'Parent of U10 Player',
    text: "Josh's coaching has transformed my son's confidence. Not just in football, but in his day-to-day discipline.",
    rating: 5,
  },
  {
    name: 'David K.',
    role: 'Parent of U14 Player',
    text: 'Elite level coaching. The difference between Foot Forward and other academies is the attention to detail. Highly recommend.',
    rating: 5,
  },
  {
    name: 'James L.',
    role: 'Parent of U8 Player',
    text: 'Brilliant sessions. The kids love it and you can really see the UEFA coaching standards being applied.',
    rating: 5,
  },
];

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const storedReviews = localStorage.getItem(STORAGE_KEY);
      if (!storedReviews) {
        return;
      }

      const parsedReviews = JSON.parse(storedReviews) as Review[];
      if (!Array.isArray(parsedReviews)) {
        return;
      }

      const validReviews = parsedReviews.filter(
        (review) =>
          typeof review.name === 'string' &&
          typeof review.role === 'string' &&
          typeof review.text === 'string' &&
          typeof review.rating === 'number' &&
          review.rating >= 1 &&
          review.rating <= 5,
      );

      if (validReviews.length > 0) {
        setReviews([...defaultReviews, ...validReviews]);
      }
    } catch {
      setReviews(defaultReviews);
    }
  }, []);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 0;
    }

    return (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  const handleAddReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!name.trim() || !role.trim() || !text.trim()) {
      setError('Please fill in your name, role, and review before submitting.');
      return;
    }

    const newReview: Review = {
      name: name.trim(),
      role: role.trim(),
      text: text.trim(),
      rating,
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);

    const customReviews = updatedReviews.slice(defaultReviews.length);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customReviews));

    setName('');
    setRole('');
    setText('');
    setRating(5);
  };

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
        <p className="text-sm mt-4 uppercase tracking-widest text-gray-300 font-bold">Average Rating: {averageRating} / 5</p>
      </section>

      <section className="py-16 bg-gray-100 text-brandBlack px-4 border-y border-gray-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-black text-3xl md:text-4xl uppercase italic text-center mb-8">Add a Review</h2>
          <form onSubmit={handleAddReview} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-brandRed"
              />
              <input
                value={role}
                onChange={(event) => setRole(event.target.value)}
                placeholder="Your role (e.g. Parent of U12 Player)"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-brandRed"
              />
            </div>

            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Write your review"
              rows={4}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-brandRed"
            />

            <div className="flex items-center gap-3">
              <span className="text-sm uppercase font-bold tracking-widest">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                  aria-label={`Set rating to ${star}`}
                >
                  <Star size={22} className={star <= rating ? 'text-brandRed fill-current' : 'text-gray-300'} />
                </button>
              ))}
            </div>

            {error && <p className="text-sm text-red-600 font-bold">{error}</p>}

            <button
              type="submit"
              className="bg-brandRed text-white font-black uppercase tracking-wider rounded-xl px-6 py-3 hover:opacity-90 transition-opacity"
            >
              Submit Review
            </button>
          </form>
        </div>
      </section>

      <section className="py-24 bg-white text-brandBlack px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-gray-50 p-10 rounded-3xl border border-gray-100 relative shadow-sm hover:shadow-xl transition-all">
              <Quote className="absolute top-6 right-8 text-brandRed/10" size={60} />
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={s <= review.rating ? 'text-brandRed fill-current' : 'text-gray-300'} size={16} />
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
