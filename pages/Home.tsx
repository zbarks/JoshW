import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CalendarCheck, Users } from 'lucide-react';
import { SITE } from '../config/site';
import { BookButton } from '../components/BookLinks';

const ThreeDFootball = lazy(() => import('../components/ThreeDFootball'));

const GALLERY_IMAGES = [
  "https://images.squarespace-cdn.com/content/v1/6347f13be3c69c5db5a7394f/d48238f5-3960-4a58-9df2-a11b8565a30c/7d8dc65e-86d0-417f-8e44-552ce498052d.jpg?format=500w",
  "https://images.squarespace-cdn.com/content/v1/6347f13be3c69c5db5a7394f/34ca7568-54c7-4765-84b9-a50bb56c26aa/b7807601-8051-4cb3-851d-10f6628b4bdb.jpg?format=500w",
  "https://images.squarespace-cdn.com/content/v1/6347f13be3c69c5db5a7394f/1677397183785-G2LHBJ3L99QK0LF6AMFZ/7e6d4829-2f37-4b8f-b5d4-eeedd6267172.jpg?format=500w",
  "https://images.squarespace-cdn.com/content/v1/6347f13be3c69c5db5a7394f/610f70ad-65d1-47b7-8fc4-6d6ffb7aa63e/85135050-7fb7-4917-80d3-e06f90d5df34.jpg?format=500w",
  "https://i.ibb.co/ksGn9g84/image-1306335.jpg",
];

const features = [
  { icon: MapPin, title: 'Top astro', desc: "Premium facilities at George Watson's College." },
  { icon: CalendarCheck, title: 'Easy booking', desc: 'Book your place online in a few clicks.' },
  { icon: Users, title: 'Groups', desc: 'Structured age-appropriate elite training.' },
];

const Home: React.FC = () => {
  const [showBall, setShowBall] = useState(false);
  const [email, setEmail] = useState('');
  const [signUpStatus, setSignUpStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Load the 3D ball after first paint, and skip it for reduced-motion users.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => setShowBall(true), 300);
    return () => window.clearTimeout(id);
  }, []);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      setSignUpStatus('error');
      return;
    }
    setSignUpStatus('loading');
    setErrorMsg('');
    try {
      // Firebase loads only when someone signs up, keeping the homepage fast.
      const [{ collection, addDoc, serverTimestamp }, { db }] = await Promise.all([
        import('firebase/firestore'),
        import('../firebase/config'),
      ]);
      await addDoc(collection(db, 'subscribers'), {
        email: email.toLowerCase().trim(),
        signedUpAt: serverTimestamp(),
        source: 'website_footer',
      });
      window.fbq?.('track', 'Lead');
      setSignUpStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Firestore sign-up error:', err);
      setErrorMsg('Something went wrong. Please try again.');
      setSignUpStatus('error');
    }
  };

  return (
    <div className="overflow-x-hidden bg-brandBlack">
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-72px)] items-center justify-center overflow-hidden px-5 py-20">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[min(90vw,640px)] w-[min(90vw,640px)]">
            {showBall && (
              <Suspense fallback={null}>
                <ThreeDFootball />
              </Suspense>
            )}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000_70%)]" />

        <div className="relative z-10 flex w-full max-w-6xl flex-col items-center text-center">
          <h1 className="animate-reveal-up">
            <span className="display block whitespace-nowrap text-[clamp(2.5rem,10.5vw,8rem)] text-white">
              Foot <span className="text-brandRed">Forward</span>
            </span>
            <span className="mt-5 block whitespace-nowrap font-heading text-[clamp(0.7rem,3.3vw,1.5rem)] font-bold uppercase tracking-[0.06em] text-neutral-300 sm:tracking-[0.12em]">
              Edinburgh's elite football academy
            </span>
          </h1>

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row [animation-delay:150ms] animate-reveal-up">
            <BookButton where="hero" className="btn-primary w-full px-9 py-4 text-base sm:w-auto" />
            <a href="#bio" className="btn-secondary w-full py-4 sm:w-auto">Meet Josh</a>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section id="bio" className="section scroll-mt-20">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-charcoal">
            <img
              src="https://c8.alamy.com/comp/JDXXBB/josh-walker-middlesbrough-fc-riverside-stadium-middlesbrough-england-JDXXBB.jpg"
              alt="Josh Walker, head coach of Foot Forward Edinburgh, during his professional playing career"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-8">
              <p className="text-sm font-semibold text-neutral-300">Head coach</p>
              <p className="display text-3xl text-white">Josh Walker</p>
            </figcaption>
          </figure>

          <div>
            <h2 className="kicker">Pro background</h2>
            <p className="display mb-8 text-4xl text-white md:text-5xl">"Elite standards. Every single session."</p>
            <p className="mb-10 max-w-xl text-lg leading-relaxed text-neutral-300">
              From England Youth International to over a decade in professional football. Josh brings a unique blend of high-level experience and UEFA-certified technical coaching to Edinburgh's youth.
            </p>
            <dl className="grid max-w-md grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div className="flex flex-col-reverse">
                <dt className="text-sm text-neutral-400">Years professional</dt>
                <dd className="display text-5xl text-white">10+</dd>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="text-sm text-neutral-400">Licensed coach</dt>
                <dd className="display text-5xl text-white">UEFA</dd>
              </div>
            </dl>
            <Link to="/about" className="mt-10 inline-block text-sm font-semibold text-white underline decoration-brandRed decoration-2 underline-offset-8 hover:text-brandRed">
              More about Josh
            </Link>
          </div>
        </div>
      </section>

      {/* The academy */}
      <section className="section bg-white text-brandBlack">
        <div className="container-page">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="display text-5xl md:text-7xl">The academy</h2>
            <BookButton where="academy-strip" className="btn-primary self-start md:self-auto" />
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 md:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-8 md:p-10">
                <Icon size={28} className="mb-6 text-brandRed" aria-hidden />
                <h3 className="mb-2 font-heading text-xl font-extrabold uppercase">{title}</h3>
                <p className="leading-relaxed text-neutral-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo strip */}
      <section className="section">
        <div className="container-page">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="display text-3xl text-white md:text-4xl">The standard</h2>
            <Link to="/gallery" className="text-sm font-semibold text-neutral-300 hover:text-white">View gallery</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
            {GALLERY_IMAGES.map((url, i) => (
              <div key={url} className={`overflow-hidden rounded-xl bg-charcoal ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                <img
                  src={url}
                  alt="Young players training at Foot Forward Edinburgh football academy"
                  width={500}
                  height={667}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email sign-up */}
      <section className="section border-t border-white/10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker">Never miss a session</p>
          <h2 className="display mb-4 text-4xl text-white md:text-5xl">Stay in the loop</h2>
          <p className="mb-10 text-lg text-neutral-400">
            Get first access to new sessions, camp announcements, and academy updates, straight to your inbox.
          </p>

          {signUpStatus === 'success' ? (
            <div role="status" className="py-6">
              <p className="display mb-2 text-3xl text-white">You're in.</p>
              <p className="text-neutral-400">We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleEmailSignUp} className="flex flex-col gap-3 sm:flex-row" noValidate>
              <label htmlFor="signup-email" className="sr-only">Email address</label>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (signUpStatus === 'error') setSignUpStatus('idle');
                }}
                placeholder="Your email address"
                className="flex-1 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-white placeholder-neutral-500 focus:border-brandRed focus:outline-none"
              />
              <button type="submit" disabled={signUpStatus === 'loading'} className="btn-secondary disabled:opacity-60">
                {signUpStatus === 'loading' ? 'Joining…' : 'Join up'}
              </button>
            </form>
          )}
          {signUpStatus === 'error' && <p role="alert" className="mt-4 text-sm font-semibold text-brandRed">{errorMsg}</p>}
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-charcoal text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="display mb-10 whitespace-nowrap text-[clamp(2.2rem,8vw,5.5rem)] text-white">
            Ready to <span className="text-brandRed">evolve?</span>
          </h2>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookButton where="final-cta" className="btn-primary w-full px-9 py-4 text-base sm:w-auto" />
            <a href={`mailto:${SITE.email}`} className="btn-secondary w-full py-4 sm:w-auto">Contact direct</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
