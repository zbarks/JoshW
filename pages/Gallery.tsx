import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { BookButton } from '../components/BookLinks';

const GALLERY_IMAGES = [
  {
    url: "https://i.ibb.co/svJpg9q2/Whats-App-Image-2026-02-27-at-05-25-11.jpg",
    alt: "Players working on ball control, Foot Forward Edinburgh"
  },
  {
    url: "https://i.ibb.co/DPTBByxY/image-2802048.jpg",
    alt: "Coach Josh Walker leading a session, Foot Forward Edinburgh"
  },
  {
    url: "https://i.ibb.co/BVPs6kJ4/image-2804434.jpg",
    alt: "Passing drill on the Top Astro, Foot Forward Edinburgh"
  },
  {
    url: "https://i.ibb.co/TDXhLsBh/image-3315090.jpg",
    alt: "Young players during a small-sided game, Foot Forward Edinburgh"
  },
  {
    url: "https://i.ibb.co/W4y3djZ8/image-3339687.jpg",
    alt: "Finishing practice at George Watson's College, Foot Forward Edinburgh"
  },
  {
    url: "https://i.ibb.co/gZpvJp1M/image-3559964.jpg",
    alt: "Group warm-up at Foot Forward Edinburgh, Foot Forward Edinburgh"
  },
  {
    url: "https://i.ibb.co/Q7rFPjcY/image-4261103.jpg",
    alt: "Dribbling drill through cones, Foot Forward Edinburgh"
  },
  {
    url: "https://i.ibb.co/0pB5R1bW/image-9511997.jpg",
    alt: "Players listening to coaching feedback, Foot Forward Edinburgh"
  },
  {
    url: "https://i.ibb.co/Z30m6qV/Whats-App-Image-2026-02-27-at-05-23-14.jpg",
    alt: "Training in action on the astro, Foot Forward Edinburgh"
  },
  {
    url: "https://i.ibb.co/VWvz8xGF/Whats-App-Image-2026-02-27-at-05-24-06.jpg",
    alt: "Players celebrating at the end of a session, Foot Forward Edinburgh"
  },
  {
    url: "https://i.ibb.co/TxypR4FT/Whats-App-Image-2026-02-27-at-05-24-40.jpg",
    alt: "Foot Forward academy squad training, Foot Forward Edinburgh"
  }
];

const Gallery: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const count = GALLERY_IMAGES.length;
  const prev = useCallback(() => setSelected((i) => (i === null ? i : (i - 1 + count) % count)), [count]);
  const next = useCallback(() => setSelected((i) => (i === null ? i : (i + 1) % count)), [count]);

  useEffect(() => {
    if (selected === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selected, prev, next]);

  return (
    <div className="bg-brandBlack">
      <section className="section pb-12 md:pb-16">
        <div className="container-page">
          <h1 className="display mb-4 whitespace-nowrap text-[clamp(2.6rem,9vw,6rem)] text-white">
            The <span className="text-brandRed">gallery</span>
          </h1>
          <p className="text-xl text-neutral-400">Moments of excellence. Training in action.</p>
        </div>
      </section>

      <section className="px-5 pb-20 md:pb-28">
        <div className="container-page columns-1 gap-4 sm:columns-2 lg:columns-3">
          {GALLERY_IMAGES.map((image, i) => (
            <button
              key={image.url}
              onClick={() => setSelected(i)}
              className="group mb-4 block w-full overflow-hidden rounded-xl bg-charcoal"
              aria-label={`Open photo: ${image.alt}`}
            >
              <img
                src={image.url}
                alt={image.alt}
                loading={i < 3 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      </section>

      <section className="section bg-charcoal">
        <dl className="container-page grid grid-cols-2 gap-10 md:grid-cols-4">
          {[
            { number: '500+', label: 'Sessions' },
            { number: '200+', label: 'Players' },
            { number: '10+', label: 'Years pro' },
            { number: '100%', label: 'Commitment' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="text-sm text-neutral-400">{stat.label}</dt>
              <dd className="display text-5xl text-white md:text-6xl">{stat.number}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="display mb-6 text-4xl text-white md:text-6xl">
            Be part of the <span className="text-brandRed">story</span>
          </h2>
          <p className="mb-10 text-xl text-neutral-400">
            Join Edinburgh's elite football academy and take your game to the next level.
          </p>
          <BookButton where="gallery" className="btn-primary px-9 py-4 text-base">Book now</BookButton>
        </div>
      </section>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setSelected(null)}
        >
          <button className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white hover:bg-brandRed" onClick={() => setSelected(null)} aria-label="Close">
            <X size={22} />
          </button>
          <button className="absolute left-3 rounded-full bg-white/10 p-3 text-white hover:bg-brandRed md:left-8" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous photo">
            <ChevronLeft size={22} />
          </button>
          <button className="absolute right-3 rounded-full bg-white/10 p-3 text-white hover:bg-brandRed md:right-8" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next photo">
            <ChevronRight size={22} />
          </button>
          <figure className="max-h-[90vh] max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <img src={GALLERY_IMAGES[selected].url} alt={GALLERY_IMAGES[selected].alt} className="max-h-[82vh] max-w-full rounded-xl object-contain" />
            <figcaption className="mt-4 text-center text-sm text-neutral-400">{selected + 1} / {count}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
};

export default Gallery;
