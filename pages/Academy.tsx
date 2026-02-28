import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Users, Smartphone } from 'lucide-react';

const Academy: React.FC = () => {
  // App store detection
  const [appStoreUrl, setAppStoreUrl] = useState('');
  const [isAndroid, setIsAndroid] = useState(false);
  const [platformText, setPlatformText] = useState('iOS / App Store');

  useEffect(() => {
    // Detect device and set appropriate app store link
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      // iOS device
      setAppStoreUrl('https://apps.apple.com/th/app/foot-forward-coaching/id6443740570');
      setIsAndroid(false);
      setPlatformText('iOS / App Store');
    } else if (/android/.test(userAgent)) {
      // Android device
      setAppStoreUrl('https://play.google.com/store/apps/details?id=app.activitypro.footforwardcoaching&hl=en_GB');
      setIsAndroid(true);
      setPlatformText('Android / Google Play');
    } else {
      // Desktop or other - default to iOS
      setAppStoreUrl('https://apps.apple.com/th/app/foot-forward-coaching/id6443740570');
      setIsAndroid(false);
      setPlatformText('iOS / Android');
    }
  }, []);

  return (
    <div className="pt-24 bg-brandBlack">
      <section className="py-20 bg-brandBlack text-center px-4">
        <h1 className="font-heading font-black text-5xl md:text-7xl mb-8 uppercase italic">Academy</h1>
        <p className="max-w-3xl mx-auto text-xl text-gray-400 leading-relaxed font-bold">
          Elite level coaching. Weekly membership camps. Exclusively managed via our app.
        </p>
      </section>

      <section className="py-24 bg-white text-brandBlack px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            {/* Weekly Membership Info */}
            <div className="bg-brandRed/5 p-8 rounded-3xl border-2 border-brandRed/20">
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3 uppercase italic">
                <Calendar className="text-brandRed" /> Weekly Membership Camps
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                Join our elite academy through a <strong>weekly membership subscription</strong>. Train consistently with Josh every week, developing your skills through structured, progressive sessions designed for long-term development.
              </p>
              <ul className="space-y-4 text-gray-600 font-bold">
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-brandRed rounded-full"></div> Regular weekly training sessions</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-brandRed rounded-full"></div> Flexible membership subscriptions</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-brandRed rounded-full"></div> Age-appropriate group coaching</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-brandRed rounded-full"></div> Continuous skill progression tracking</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border-2 border-dashed border-gray-200">
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3 uppercase italic">
                <Smartphone className="text-brandRed" /> App-Based Membership
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                All membership subscriptions, weekly camp bookings, and coaching feedback are managed exclusively through our mobile app. Stay connected with your training schedule and track your progress.
              </p>
              <ul className="space-y-4 text-gray-600 font-bold">
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-brandRed rounded-full"></div> Easy subscription management</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-brandRed rounded-full"></div> Real-time weekly camp schedules</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-brandRed rounded-full"></div> Direct communication with Josh</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-brandRed rounded-full"></div> Training resources and drills</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3 uppercase italic">
                <MapPin className="text-brandRed" /> Training Locations
              </h2>
              <div className="mb-8">
                <h3 className="text-2xl font-black mb-2 text-brandBlack uppercase italic">George Watson's College</h3>
                <p className="text-lg text-gray-600 font-bold uppercase tracking-tight">Top Astro Pitch</p>
                <p className="text-gray-500 mt-2 font-medium">Colinton Rd, Edinburgh EH10 5EG</p>
              </div>
              
              <div className="aspect-video bg-brandBlack rounded-3xl overflow-hidden relative border-4 border-gray-100 shadow-2xl">
                <img 
                  src="https://images.squarespace-cdn.com/content/v1/6347f13be3c69c5db5a7394f/c2292680-3301-4f22-b7b8-4a92b20cc64f/c659d74f-fe49-48be-be8e-35f9ddcdb230.jpg?format=750w" 
                  className="w-full h-full object-cover grayscale opacity-70" 
                  alt="George Watson's Top Astro" 
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <span className="bg-brandRed text-white px-8 py-4 rounded-full font-black shadow-2xl uppercase italic tracking-widest text-xl mb-4">
                    TOP ASTRO
                  </span>
                  <p className="text-white font-black text-2xl uppercase italic drop-shadow-lg">GEORGE WATSON'S COLLEGE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-8 bg-brandBlack text-white rounded-3xl shadow-2xl border border-white/5">
              <h3 className="text-2xl font-black mb-6 uppercase italic text-brandRed">Join the Academy</h3>
              <p className="text-gray-400 mb-8 font-bold">
                Subscribe to weekly membership camps. Download the app to view schedules, manage your subscription, and secure your spot at George Watson's.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                    <Smartphone className="text-brandRed" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">Platform</p>
                    <p className="font-black text-lg">{platformText}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                    <Calendar className="text-brandRed" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">Schedule</p>
                    <p className="font-black text-lg">Weekly Camps</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                    <Clock className="text-brandRed" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">Membership</p>
                    <p className="font-black text-lg">Subscription Based</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                    <Users className="text-brandRed" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">Ages</p>
                    <p className="font-black text-lg">All Groups</p>
                  </div>
                </div>
              </div>

              <a 
                href={appStoreUrl}
                className="block w-full text-center bg-brandRed text-white py-5 rounded-xl font-black hover:bg-white hover:text-brandBlack transition-all uppercase italic tracking-widest flex items-center justify-center gap-2"
              >
                {isAndroid ? (
                  <>
                    <img 
                      src="http://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_Play_2022_icon.svg/960px-Google_Play_2022_icon.svg.png" 
                      alt="Google Play"
                      className="w-5 h-5"
                    />
                    DOWNLOAD APP
                  </>
                ) : (
                  <>
                    <Smartphone className="w-5 h-5" />
                    DOWNLOAD APP
                  </>
                )}
              </a>
              <p className="text-center text-[10px] text-gray-500 mt-4 uppercase font-bold tracking-widest">
                {isAndroid ? 'Available on Google Play' : 'Available on the App Store'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academy;