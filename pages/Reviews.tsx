import React, { useState, useEffect } from 'react';
import { Star, Plus, X } from 'lucide-react';
import { BookButton } from '../components/BookLinks';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

interface Review {
  id?: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  createdAt: Timestamp;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    rating: 5
  });

  // Load reviews from Firestore
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const loadedReviews: Review[] = [];
      
      querySnapshot.forEach((doc) => {
        loadedReviews.push({
          id: doc.id,
          ...doc.data() as Omit<Review, 'id'>
        });
      });
      
      setReviews(loadedReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const newReview = {
        name: formData.name,
        role: formData.role,
        text: formData.text,
        rating: Number(formData.rating),
        createdAt: Timestamp.now()
      };

      await addDoc(collection(db, 'reviews'), newReview);
      
      // Reload reviews to show the new one
      await loadReviews();
      
      setShowModal(false);
      setFormData({ name: '', role: '', text: '', rating: 5 });
    } catch (error) {
      console.error('Failed to save review:', error);
      alert('Failed to save review. Please try again.');
    }
    setSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="bg-brandBlack">
      <section className="section pb-16 md:pb-20">
        <div className="container-page flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h1 className="display mb-6 text-5xl text-white md:text-7xl">Reviews</h1>
            <div className="flex items-center gap-4">
              <div className="flex" aria-hidden>
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="fill-current text-brandRed" size={22} />)}
              </div>
              <p className="text-lg font-semibold text-white">{averageRating} star rated academy</p>
              <p className="text-neutral-500">{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</p>
            </div>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-secondary self-start md:self-auto">
            <Plus size={18} aria-hidden /> Leave a review
          </button>
        </div>
      </section>

      <section className="section bg-white text-brandBlack">
        <div className="container-page">
          {loading ? (
            <p className="text-center text-neutral-500">Loading reviews…</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-xl text-neutral-500">No reviews yet. Be the first to leave one.</p>
          ) : (
            <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
              {reviews.map((review) => (
                <figure key={review.id} className="mb-6 break-inside-avoid rounded-2xl border border-neutral-200 p-8">
                  <div className="mb-4 flex" aria-label={`${review.rating} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={s <= review.rating ? 'fill-current text-brandRed' : 'text-neutral-300'} size={16} aria-hidden />
                    ))}
                  </div>
                  <blockquote className="mb-6 text-lg leading-relaxed text-neutral-700">"{review.text}"</blockquote>
                  <figcaption>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-neutral-500">{review.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
          <div className="mt-16 text-center">
            <BookButton where="reviews" />
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-labelledby="review-title">
          <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-8 md:p-10">
            <button onClick={() => setShowModal(false)} className="absolute right-5 top-5 text-neutral-400 hover:text-brandRed" aria-label="Close">
              <X size={26} />
            </button>
            <h2 id="review-title" className="mb-8 font-heading text-2xl font-extrabold uppercase text-brandBlack">Leave a review</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="r-name" className="field-label">Your name</label>
                <input id="r-name" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John D." className="field" />
              </div>
              <div>
                <label htmlFor="r-role" className="field-label">Your role</label>
                <input id="r-role" type="text" name="role" value={formData.role} onChange={handleChange} required placeholder="Parent of U12 player" className="field" />
              </div>
              <div>
                <label htmlFor="r-rating" className="field-label">Rating</label>
                <select id="r-rating" name="rating" value={formData.rating} onChange={handleChange} className="field">
                  <option value={5}>5 stars</option>
                  <option value={4}>4 stars</option>
                  <option value={3}>3 stars</option>
                  <option value={2}>2 stars</option>
                  <option value={1}>1 star</option>
                </select>
              </div>
              <div>
                <label htmlFor="r-text" className="field-label">Your review</label>
                <textarea id="r-text" name="text" value={formData.text} onChange={handleChange} required rows={4} placeholder="Share your experience with Foot Forward Coaching" className="field" />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full bg-brandBlack py-4 hover:bg-brandRed disabled:opacity-50">
                {submitting ? 'Submitting…' : 'Submit review'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
