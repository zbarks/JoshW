import React, { useEffect, useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    url: "https://i.ibb.co/svJpg9q2/Whats-App-Image-2026-02-27-at-05-25-11.jpg",
    alt: "Training Session 1"
  },
  {
    url: "https://i.ibb.co/DPTBByxY/image-2802048.jpg",
    alt: "Training Session 2"
  },
  {
    url: "https://i.ibb.co/BVPs6kJ4/image-2804434.jpg",
    alt: "Training Session 3"
  },
  {
    url: "https://i.ibb.co/TDXhLsBh/image-3315090.jpg",
    alt: "Training Session 4"
  },
  {
    url: "https://i.ibb.co/W4y3djZ8/image-3339687.jpg",
    alt: "Training Session 5"
  },
  {
    url: "https://i.ibb.co/gZpvJp1M/image-3559964.jpg",
    alt: "Training Session 6"
  },
  {
    url: "https://i.ibb.co/Q7rFPjcY/image-4261103.jpg",
    alt: "Training Session 7"
  },
  {
    url: "https://i.ibb.co/0pB5R1bW/image-9511997.jpg",
    alt: "Training Session 8"
  },
  {
    url: "https://i.ibb.co/Z30m6qV/Whats-App-Image-2026-02-27-at-05-23-14.jpg",
    alt: "Training Session 9"
  },
  {
    url: "https://i.ibb.co/VWvz8xGF/Whats-App-Image-2026-02-27-at-05-24-06.jpg",
    alt: "Training Session 10"
  },
  {
    url: "https://i.ibb.co/TxypR4FT/Whats-App-Image-2026-02-27-at-05-24-40.jpg",
    alt: "Training Session 11"
  }
];

const Gallery: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const getSleek3DStyle = (offset: number) => {
    const progress = Math.max(0, scrollY - offset);
    return {
      transform: `perspective(1200px) translateY(${progress * -0.05}px) translateZ(${Math.min(50, progress * 0.1)}px) rotateX(${Math.min(3, progress * 0.005)}deg)`,
      opacity: 1
    };
  };

  return (
    <div className="bg-brandBlack overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-4 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-15"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, #EE1D23 0%, transparent 70%)',
            transform: `translateY(${scrollY * 0.2}px) scale(${1 + scrollY * 0.0003})`
          }}
        />
        
        <div className="relative z-10 text-center max-w-7xl mx-auto">
          <div className={`${isLoaded ? 'animate-reveal-up' : 'opacity-0'}`}>
            <h1 className="font-heading font-black text-6xl md:text-8xl lg:text-9xl mb-6 leading-[0.85] uppercase tracking-normal text-white">
              THE<br />
              <span className="text-brandRed">GALLERY</span>
            </h1>
            <p className="text-xl md:text-2xl font-heading font-bold text-gray-400 uppercase tracking-[0.2em] mt-8">
              MOMENTS OF EXCELLENCE
            </p>
          </div>
        </div>
      </section>

      {/* Main Gallery Grid */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div 
            className="mb-16 text-center"
            style={getSleek3DStyle(200)}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-black text-white uppercase tracking-wider mb-4">
              TRAINING <span className="text-brandRed">IN ACTION</span>
            </h2>
            <div className="h-1 w-20 bg-brandRed mx-auto" />
          </div>

          {/* Masonry-style Grid */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            style={getSleek3DStyle(400)}
          >
            {GALLERY_IMAGES.map((image, i) => (
              <div 
                key={i}
                className={`relative group rounded-2xl overflow-hidden shadow-2xl cursor-pointer
                  ${i % 5 === 0 ? 'lg:row-span-2' : ''}
                  ${i % 7 === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}
                `}
                style={{ 
                  transform: `translateY(${Math.sin((scrollY * 0.001) + i) * 10}px)`,
                  aspectRatio: i % 5 === 0 ? '3/4' : '4/3'
                }}
                onClick={() => setSelectedImage(i)}
              >
                {/* Image Container */}
                <div className="relative w-full h-full">
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brandBlack/80 via-brandBlack/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-16 h-16 bg-brandRed rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      <ZoomIn size={28} className="text-white" />
                    </div>
                  </div>

                  {/* Red accent on hover */}
                  <div className="absolute inset-0 bg-brandRed/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Border glow */}
                  <div className="absolute inset-0 border-2 border-brandRed/0 group-hover:border-brandRed/50 rounded-2xl transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-charcoal relative overflow-hidden">
        <div 
          className="max-w-7xl mx-auto px-4"
          style={getSleek3DStyle(800)}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { number: "500+", label: "SESSIONS" },
              { number: "200+", label: "PLAYERS" },
              { number: "10+", label: "YEARS PRO" },
              { number: "100%", label: "COMMITMENT" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-5xl md:text-6xl font-black text-white mb-3">{stat.number}</p>
                <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-brandBlack text-center px-4">
        <div 
          className="max-w-4xl mx-auto"
          style={getSleek3DStyle(1000)}
        >
          <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-8 uppercase tracking-tighter">
            BE PART OF THE<br /><span className="text-brandRed">STORY</span>
          </h2>
          <p className="text-xl text-gray-400 font-bold mb-12 max-w-2xl mx-auto">
            Join Edinburgh's elite football academy and take your game to the next level.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="https://apps.apple.com/th/app/foot-forward-coaching/id6443740570" 
              className="group relative px-10 py-5 bg-brandRed text-white font-black rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(238,29,35,0.4)] uppercase tracking-wider text-sm"
            >
              <span className="relative z-10 flex items-center gap-3">
                <img
                  src="https://img.icons8.com/ios11/512/FFFFFF/mac-os.png" 
                  alt="Apple"
                  className="w-5 h-5" 
                /> 
                BOOK NOW
              </span>
            </a>
            <a 
              href="/" 
              className="px-10 py-5 border border-white/20 text-white font-bold rounded-full hover:bg-white hover:text-brandBlack transition-all uppercase tracking-wider text-sm"
            >
              BACK HOME
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-brandBlack/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-8 right-8 w-12 h-12 bg-brandRed rounded-full flex items-center justify-center hover:scale-110 transition-transform z-50"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} className="text-white" />
          </button>

          {/* Navigation Buttons */}
          <button
            className="absolute left-8 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-brandRed transition-colors z-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((selectedImage - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
            }}
          >
            <span className="text-white text-2xl">‹</span>
          </button>
          <button
            className="absolute right-8 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-brandRed transition-colors z-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((selectedImage + 1) % GALLERY_IMAGES.length);
            }}
          >
            <span className="text-white text-2xl">›</span>
          </button>

          {/* Image */}
          <div className="max-w-6xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <img 
              src={GALLERY_IMAGES[selectedImage].url}
              alt={GALLERY_IMAGES[selectedImage].alt}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
            <p className="text-center text-gray-400 mt-4 font-bold uppercase tracking-widest text-sm">
              {selectedImage + 1} / {GALLERY_IMAGES.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;