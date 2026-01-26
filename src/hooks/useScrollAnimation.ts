import { useEffect, RefObject } from 'react';

export function useScrollAnimation(ref: RefObject<HTMLElement | null>, selector: string = ".fade-in-element") {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      const elements = ref.current.querySelectorAll(selector);
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [ref, selector]);
}
