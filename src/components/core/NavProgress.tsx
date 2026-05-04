import React from 'react';

interface NavProgressProps {
  progressRef: React.RefObject<HTMLDivElement | null>;
  showNav: boolean;
  dropdownOpen: boolean;
}

const NavProgress: React.FC<NavProgressProps> = ({ progressRef, showNav, dropdownOpen }) => (
  <>
    {/* GSAP PAGE PROGRESS BAR — thick when nav is hidden, thin when nav is visible */}
    <div
      ref={progressRef}
      className={`fixed top-0 left-0 w-full bg-accent z-[110] origin-left scale-x-0 will-change-transform pointer-events-none transition-[height] duration-500 ease-in-out ${showNav ? 'h-[3px]' : 'h-[8px]'}`}
    />

    {/* DROPDOWN FOCUS BLUR SCRIM */}
    <div
      className={`hidden lg:block fixed inset-0 z-[90] bg-secondary/10 backdrop-blur-[3px] pointer-events-none transition-all duration-500 ${dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
    />
  </>
);

export default NavProgress;
