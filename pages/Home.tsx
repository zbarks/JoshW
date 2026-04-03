import React, { useEffect, useState, useRef } from 'react';
import { ArrowDown, MapPin, Smartphone, Users } from 'lucide-react';
import ThreeDFootball from '../components/ThreeDFootball';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

// 1. Tell TypeScript that 'fbq' is okay to use
declare global {
  interface Window {
    fbq: any;
  }
}

const GALLERY_IMAGES = [
  "https://squarespace-cdn.com",
  "https://squarespace-cdn.com",
  "https://squarespace-cdn.com",
  "https://squarespace-cdn.com",
  "https://ibb.co"
];

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Email sign-up state
  const [email, setEmail] = useState('');
  const [signUpStatus, setSignUpStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // App store detection
  const [appStoreUrl, setAppStoreUrl] = useState('');
  const [appStoreLogo, setAppStoreLogo] = useState('');
  const [appStoreText, setAppStoreText] = useState('BOOK THROUGH OUR APP');

  // 2. NEW: The tracking function (placed OUTSIDE useEffect)
  const handleAppDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Check if Pixel is loaded before firing
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'AppDownloadClick', { 
        platform: appStoreText 
      });
    }

    // Wait 300ms for the pixel to send, then redirect
    setTimeout(() => {
      window.location.href = appStoreUrl;
    }, 300);
  };

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Detect device and set appropriate app store link
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setAppStoreUrl('https://apple.com');
      setAppStoreLogo('https://icons8.com');
      setAppStoreText('DOWNLOAD ON APP STORE');
    } else if (/android/.test(userAgent)) {
      setAppStoreUrl('https://google.com');
      setAppStoreLogo('http://wikimedia.org');
      setAppStoreText('GET IT ON GOOGLE PLAY');
    } else {
      setAppStoreUrl('https://apple.com');
      setAppStoreLogo('https://icons8.com');
      setAppStoreText('BOOK THROUGH OUR APP');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSleek3DStyle = (offset: number) => {
    const progress = Math.max(0, scrollY - offset);
    return {
      transform: `perspective(1200px) translateY(${progress * -0.05}px) translateZ(${Math.min(50, progress * 0.1)}px) rotateX(${Math.min(3, progress * 0.005)}deg)`,
      opacity: 1
    };
  };

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
      await addDoc(collection(db, 'subscribers'), {
        email: email.toLowerCase().trim(),
        signedUpAt: serverTimestamp(),
        source: 'website_footer'
      });
      
      // NEW: Track successful lead
      if (window.fbq) { window.fbq('track', 'Lead'); }

      setSignUpStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Firestore sign-up error:', err);
      setErrorMsg('Something went wrong. Please try again.');
      setSignUpStatus('error');
    }
  };

  return (
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
              EDINBURGH'S FOOTBALL ELITE ACADEMY
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
              {/* 3. UPDATED: Button with tracking click handler */}
              <a 
                href={appStoreUrl}
                onClick={handleAppDownloadClick}
                className="group relative px-10 py-5 bg-brandRed text-white font-black rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(238,29,35,0.4)] uppercase tracking-wider text-sm sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <img
                    src={appStoreLogo}
                    alt="App Store"
                    className="w-5 h-5" 
                  /> 
                  {appStoreText}
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

      {/* Biography Section (Keeping all your existing content) */}
      <section id="bio" className="py-48 px-4 relative">
        <div 
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          style={getSleek3DStyle(500)}
        >
          <div className="relative group">
            <div className="absolute -inset-2 bg-brandRed/10 blur-2xl rounded-[3rem]" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl bg-charcoal/50">
              <img 
                src="https://alamy.com" 
                alt="Josh Walker" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10">
                <p className="text-brandRed font-black tracking-widest text-xs mb-2 uppercase">HEAD COACH</p>
                <h3 className="text-4xl font-heading font-black text-white uppercase">JOSH WALKER</h3>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <h4 className="text-brandRed font-black text-sm uppercase tracking-[0.4em]">PRO BACKGROUND</h4>
            {/* Rest of bio text here... */}
          </div>
        </div>
      </section>
      {/* Rest of your component logic follows... */}
    </div>
  );
};

export default Home;
