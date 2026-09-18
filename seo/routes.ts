import { FAQS } from './faqs';

// Per-page SEO. Used in two places:
// 1. vite.config.ts writes a static HTML file per route at build time, so Google,
//    ChatGPT, Claude, Perplexity etc. can read real content without running JavaScript.
// 2. components/Seo.tsx updates the <head> when visitors move between pages.

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  // Plain HTML shown to crawlers before React loads. Uses the site's own copy.
  body: string;
}

const nav = `<nav><a href="/">Home</a> | <a href="/what-we-do">What We Do</a> | <a href="/academy">Academy</a> | <a href="/about">About Josh</a> | <a href="/reviews">Reviews</a> | <a href="/gallery">Gallery</a> | <a href="/contact">Contact</a></nav>`;

const contact = `<p>Foot Forward Edinburgh, George Watson's College Top Astro Pitch, Colinton Rd, Edinburgh EH10 5EG. Phone 07521 484647. Email footforwardcoaching@gmail.com.</p>`;

export const ROUTES: RouteSeo[] = [
  {
    path: '/',
    title: "Foot Forward Edinburgh | Football Academy & Coaching with Josh Walker",
    description:
      "Edinburgh's elite football academy. Weekly youth football camps at George Watson's College, coached by former England Youth International and UEFA licensed coach Josh Walker.",
    body: `${nav}
<h1>Foot Forward Edinburgh: Edinburgh's elite football academy</h1>
<p>From England Youth International to over a decade in professional football. Josh Walker brings a unique blend of high-level experience and UEFA-certified technical coaching to Edinburgh's youth.</p>
<h2>The academy</h2>
<ul><li>Top astro: premium facilities at George Watson's College.</li><li>Easy booking: book sessions online, with scheduling and pro feedback via our app.</li><li>Groups: structured, age-appropriate elite training.</li></ul>
<p><a href="/academy">Book a weekly camp</a></p>${contact}`,
  },
  {
    path: '/what-we-do',
    title: 'Youth Football Coaching Programme | Foot Forward Edinburgh',
    description:
      'Technical, tactical, physical and character development for young footballers in Edinburgh, built on professional academy standards.',
    body: `${nav}
<h1>What we do</h1>
<p>At Foot Forward, we provide more than just football training. We offer a pathway to elite athletic performance and personal growth.</p>
<h2>Technical excellence</h2><p>Mastering ball control, passing precision, and clinical finishing through professional drills.</p>
<h2>Tactical intelligence</h2><p>Understanding the game, positioning, and decision-making on and off the ball.</p>
<h2>Physical conditioning</h2><p>Building agility, speed, and strength tailored to young athletes' growth phases.</p>
<h2>Character building</h2><p>Developing discipline, teamwork, and resilience to grow as footballers and young adults.</p>
<h2>Our methodology</h2><p>Drawing from Josh Walker's experience in the England Youth International setup, we apply professional academy standards to every session.</p>${contact}`,
  },
  {
    path: '/academy',
    title: "Weekly Football Camps at George Watson's College | Foot Forward Edinburgh",
    description:
      "Join Foot Forward's weekly membership football camps on the Top Astro at George Watson's College, Edinburgh. Age-appropriate group coaching. Book online.",
    body: `${nav}
<h1>Academy: weekly membership football camps in Edinburgh</h1>
<p>Elite level coaching. Weekly membership camps. Book online or through our app.</p>
<p>Join our elite academy through a weekly membership subscription. Train consistently with Josh every week, developing your skills through structured, progressive sessions designed for long-term development.</p>
<h2>Training location</h2><p>George Watson's College, Top Astro Pitch, Colinton Rd, Edinburgh EH10 5EG.</p>
<h2>Frequently asked questions</h2>
${FAQS.map((f) => `<h3>${f.q}</h3><p>${f.a}</p>`).join('\n')}${contact}`,
  },
  {
    path: '/about',
    title: 'About Josh Walker, Former England Youth International | Foot Forward Edinburgh',
    description:
      "Josh Walker is a former England Youth International with 10+ years in professional football and a UEFA licensed coach who founded Foot Forward, Edinburgh's leading football academy.",
    body: `${nav}
<h1>Josh Walker, founder of Foot Forward</h1>
<p>As an ex England Youth International, I've lived and breathed football at the highest levels of the game for over a decade. Playing in professional environments for 10+ years taught me what it truly takes to succeed.</p>
<p>Now, as a UEFA licensed coach, I've dedicated the last 4+ years to building Edinburgh's leading football academy. My mission is to translate professional standards into actionable development for young players.</p>${contact}`,
  },
  {
    path: '/reviews',
    title: 'Reviews from Players and Parents | Foot Forward Edinburgh',
    description: 'Read what players and parents say about Foot Forward Edinburgh football academy, or leave a review of your own.',
    body: `${nav}<h1>Reviews</h1><p>Reviews from players and parents at Foot Forward Edinburgh.</p>${contact}`,
  },
  {
    path: '/gallery',
    title: 'Gallery: Training in Action | Foot Forward Edinburgh',
    description: "Photos from Foot Forward Edinburgh training sessions on the Top Astro at George Watson's College.",
    body: `${nav}<h1>The gallery</h1><p>Moments of excellence. Training in action at Foot Forward Edinburgh.</p>${contact}`,
  },
  {
    path: '/contact',
    title: 'Contact Foot Forward Edinburgh Football Academy',
    description: 'Get in touch with Josh Walker at Foot Forward Edinburgh. Call 07521 484647 or send a message about football coaching in Edinburgh.',
    body: `${nav}<h1>Get in touch</h1><p>Ready to take your game to the next level? Contact us today.</p>${contact}`,
  },
];

export const findRoute = (path: string) =>
  ROUTES.find((r) => r.path === path) ?? ROUTES[0];
