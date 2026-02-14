import React, { useEffect, useState, useRef } from 'react';
import { Apple, ArrowDown, MapPin, Smartphone, Users } from 'lucide-react';
import ThreeDFootball from '../components/ThreeDFootball';
import CurtainReveal from '../components/CurtainReveal';

const GALLERY_IMAGES = [
  "https://images.squarespace-cdn.com/content/v1/6347f13be3c69c5db5a7394f/d48238f5-3960-4a58-9df2-a11b8565a30c/7d8dc65e-86d0-417f-8e44-552ce498052d.jpg?format=500w",
  "https://images.squarespace-cdn.com/content/v1/6347f13be3c69c5db5a7394f/34ca7568-54c7-4765-84b9-a50bb56c26aa/b7807601-8051-4cb3-851d-10f6628b4bdb.jpg?format=750w",
  "https://images.squarespace-cdn.com/content/v1/6347f13be3c69c5db5a7394f/1677397183785-G2LHBJ3L99QK0LF6AMFZ/7e6d4829-2f37-4b8f-b5d4-eeedd6267172.jpg?format=750w",
  "https://images.squarespace-cdn.com/content/v1/6347f13be3c69c5db5a7394f/610f70ad-65d1-47b7-8fc4-6d6ffb7aa63e/85135050-7fb7-4917-80d3-e06f90d5df34.jpg?format=750w",
  "https://images.squarespace-cdn.com/content/v1/6347f13be3c69c5db5a7394f/ef4b2ffa-5bc5-4156-8205-23d49e8de408/005a6aa8-a104-4fb3-a15e-7c86e92f634e.jpg?format=750w"
];

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load content immediately, don't wait for curtain
    setIsLoaded(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCurtainComplete = () => {
    setShowCurtain(false);
  };

  // Simplified 3D style that doesn't fade the opacity aggressively
  const getSleek3DStyle = (offset: number) => {
    const progress = Math.max(0, scrollY - offset);
    return {
      transform: `perspective(1200px) translateY(${progress * -0.05}px) translateZ(${Math.min(50, progress * 0.1)}px) rotateX(${Math.min(3, progress * 0.005)}deg)`,
      opacity: 1 // Keep it fully visible for a cleaner look
    };
  };

  return (
    <>
      <div ref={containerRef} className="bg-brandBlack overflow-x-hidden">
        {/* 3D Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
          <div 
            className="absolute inset-0 z-0 opacity-15"
            style={{ 
              backgroundImage: 'radial-gradient(circle at 50% 50%, #EE1D23 0%, transparent 70%)',
              transform: `translateY(${scrollY * 0.2}px) scale(${1 + scrollY * 0.0003})`
            }}
          />
          
          <div className="relative z-10 text-center max-w-7xl mx-auto flex flex-col items-center">
            <div className={`${isLoaded ? 'animate-reveal-up' : 'opacity-0'}`}>
              <h1 className="font-heading font-black text-7xl md:text-9xl lg:text-[10rem] mb-2 leading-[0.85] uppercase tracking-normal text-white">
                FOOT<br />
                <span className="text-brandRed">FORWARD</span>
              </h1>
            </div>
            
            <div className={`${isLoaded ? 'animate-reveal-up reveal-delay-1' : 'opacity-0'} mt-10 space-y-8`}>
              <h2 className="text-xl md:text-3xl font-heading font-bold text-gray-400 uppercase tracking-[0.2em]">
                EDINBURGH'S ELITE ACADEMY
              </h2>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
                <a 
                  href="https://apps.apple.com/th/app/foot-forward-coaching/id6443740570" 
                  className="group relative px-10 py-5 bg-brandRed text-white font-black rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(238,29,35,0.4)] uppercase tracking-wider text-sm sm:text-base"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Apple className="w-5 h-5" /> ACCESS APP
                  </span>
                </a>
                <a 
                  href="#bio" 
                  className="px-10 py-5 border border-white/20 text-white font-bold rounded-full hover:bg-white hover:text-brandBlack transition-all uppercase tracking-wider text-sm sm:text-base"
                >
                  MEET JOSH
                </a>
              </div>
            </div>

            <div className="mt-20 w-full flex justify-center scale-90 md:scale-100">
               <ThreeDFootball />
            </div>
          </div>

          <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-brandRed transition-opacity duration-1000 ${scrollY > 100 ? 'opacity-0' : 'opacity-100'}`}>
            <ArrowDown size={32} />
          </div>
        </section>

        {/* Biography Section - Refined for "Sleek and Less Dark" */}
        <section id="bio" className="py-48 px-4 relative">
          <div 
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
            style={getSleek3DStyle(500)}
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-brandRed/10 blur-2xl rounded-[3rem]" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl bg-charcoal/50">
                <img 
                  src="https://i2-prod.edinburghlive.co.uk/article16862634.ece/ALTERNATES/s1200c/0_19224168.jpg" 
                  alt="Josh Walker" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Lightened overlay for a cleaner look */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <p className="text-brandRed font-black tracking-widest text-xs mb-2 uppercase">HEAD COACH</p>
                  <h3 className="text-4xl font-heading font-black text-white uppercase">JOSH WALKER</h3>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <h4 className="text-brandRed font-black text-sm uppercase tracking-[0.4em]">PRO BACKGROUND</h4>
              <p className="text-4xl md:text-5xl text-white font-heading font-black leading-tight uppercase">
                "Elite standards. <br />Every single session."
              </p>
              <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-xl">
                From England Youth International to over a decade in professional football. Josh brings a unique blend of high-level experience and UEFA-certified technical coaching to Edinburgh's youth.
              </p>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <p className="text-5xl font-black text-white mb-1">10+</p>
                  <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">YEARS PROFESSIONAL</p>
                </div>
                <div>
                  <p className="text-5xl font-black text-white mb-1">UEFA</p>
                  <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">LICENSED COACH</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-40 bg-white text-brandBlack">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tight mb-4">THE ACADEMY</h2>
              <div className="h-1.5 w-24 bg-brandRed mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { icon: <MapPin />, title: "TOP ASTRO", desc: "Premium facilities at George Watson's College." },
                { icon: <Smartphone />, title: "APP ONLY", desc: "Seamless scheduling and pro feedback via our app." },
                { icon: <Users />, title: "GROUPS", desc: "Structured age-appropriate elite training." }
              ].map((feature, i) => (
                <div 
                  key={i}
                  className="group p-12 bg-gray-50 rounded-[2.5rem] border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-white"
                >
                  <div className="w-14 h-14 bg-brandBlack text-brandRed rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110">
                    {React.cloneElement(feature.icon as React.ReactElement, { size: 28 })}
                  </div>
                  <h4 className="text-2xl font-black mb-4 uppercase">{feature.title}</h4>
                  <p className="text-gray-500 font-bold leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section - Subtle and Elegant */}
        <section className="py-40 bg-brandBlack px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-3xl font-heading font-black mb-20 text-white uppercase tracking-widest">
              THE <span className="text-brandRed">STANDARD</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {GALLERY_IMAGES.map((url, i) => (
                <div 
                  key={i}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden group shadow-lg"
                  style={{ 
                    transform: `translateY(${Math.sin((scrollY * 0.001) + i) * 8}px)` 
                  }}
                >
                  <img 
                    src={url} 
                    alt="Academy Session" 
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-brandRed/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 bg-charcoal relative overflow-hidden text-center px-4">
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-heading font-black text-white mb-10 uppercase tracking-tighter">
              READY TO<br /><span className="text-brandRed">EVOLVE?</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="https://apps.apple.com/th/app/foot-forward-coaching/id6443740570" 
                className="px-12 py-6 bg-brandRed text-white font-black rounded-full hover:scale-105 transition-transform uppercase tracking-widest text-base shadow-xl"
              >
                DOWNLOAD APP
              </a>
              <a 
                href="mailto:footforwardcoaching@gmail.com"
                className="px-12 py-6 border border-white/20 text-white font-bold rounded-full hover:bg-white hover:text-brandBlack transition-all uppercase tracking-widest text-base"
              >
                CONTACT DIRECT
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Curtain appears OVER everything */}
      {showCurtain && <CurtainReveal onComplete={handleCurtainComplete} />}
    </>
  );
};

export default Home;