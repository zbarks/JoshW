import React, { useState, useEffect } from 'react';
import { Star, Quote, Plus, X } from 'lucide-react';
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
    <div className="pt-24 bg-brandBlack">
      <section className="py-24 bg-brandBlack text-center px-4">
        <h1 className="font-heading font-black text-5xl md:text-7xl mb-8 uppercase italic">Reviews</h1>
        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="text-brandRed fill-current" size={32} />
          ))}
        </div>
        <p className="text-2xl font-black uppercase tracking-widest">
          {averageRating} Star Rated Academy
        </p>
        <p className="text-gray-400 mt-2 font-bold">
          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </p>
      </section>

      <section className="py-24 bg-white text-brandBlack px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Add Review Button */}
          <div className="text-center mb-12">
            <button
              onClick={() => setShowModal(true)}
              className="bg-brandBlack text-white font-black py-4 px-8 rounded-xl flex items-center justify-center gap-3 hover:bg-brandRed transition-all uppercase italic tracking-widest mx-auto"
            >
              <Plus size={20} /> Leave a Review
            </button>
          </div>

          {/* Reviews Grid */}
          {loading ? (
            <p className="text-center text-gray-500 font-bold">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-gray-500 font-bold text-xl">
              No reviews yet. Be the first to leave one!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 p-10 rounded-3xl border border-gray-100 relative shadow-sm hover:shadow-xl transition-all">
                  <Quote className="absolute top-6 right-8 text-brandRed/10" size={60} />
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star 
                        key={s} 
                        className={s <= review.rating ? "text-brandRed fill-current" : "text-gray-300"} 
                        size={16} 
                      />
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
          )}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-brandRed transition-colors"
            >
              <X size={32} />
            </button>

            <h2 className="text-3xl font-black mb-8 uppercase italic text-brandBlack">Leave a Review</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2 text-brandBlack">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John D."
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed text-brandBlack"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2 text-brandBlack">Your Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  placeholder="Parent of U12 Player"
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed text-brandBlack"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2 text-brandBlack">Rating</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed text-brandBlack font-bold"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  <option value={2}>⭐⭐ (2 Stars)</option>
                  <option value={1}>⭐ (1 Star)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2 text-brandBlack">Your Review</label>
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Share your experience with Foot Forward Coaching..."
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brandRed text-brandBlack"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brandBlack text-white font-black py-4 rounded-xl hover:bg-brandRed transition-all uppercase italic tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;