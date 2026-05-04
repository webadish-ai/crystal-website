import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  // Don't render on touch/stylus devices — they have no pointer to follow
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  if (isTouch) return null;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    const onMouseMove = (e: MouseEvent) => {
      // Use direct DOM manipulation for performance with cursor
      requestAnimationFrame(() => {
        dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        ring.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = 'default';
    };
  }, []);

  return (
    <>
      {/* Ring Cursor */}
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-accent rounded-full pointer-events-none z-[9999] -ml-5 -mt-5 transition-transform duration-100 ease-out will-change-transform" 
      />
      {/* Dot Cursor */}
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[10000] -ml-[3px] -mt-[3px] will-change-transform" 
      />
    </>
  );
};

export default CustomCursor;
