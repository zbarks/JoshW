import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { findRoute } from '../seo/routes';
import { SITE } from '../config/site';

const setMeta = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

// Keeps title, description and canonical correct as visitors move between pages,
// and tracks each page view in the Meta Pixel.
const Seo = () => {
  const { pathname } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    const r = findRoute(pathname);
    const url = SITE.url + (r.path === '/' ? '/' : r.path);
    document.title = r.title;
    setMeta('meta[name="description"]', 'content', r.description);
    setMeta('meta[property="og:title"]', 'content', r.title);
    setMeta('meta[property="og:description"]', 'content', r.description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);

    if (first.current) {
      first.current = false;
    } else if ((window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }, [pathname]);

  return null;
};

export default Seo;
