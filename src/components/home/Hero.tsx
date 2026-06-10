import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroPosterRaw from '../../assets/hero.png?url';
import { FiVolume2, FiVolumeX, FiPlay, FiPause } from 'react-icons/fi';
import {
  EASE,
  containerVariants,
  wordContainerVariants,
  charVariants,
  viewportOnce,
} from '@components/core/animations';
import Button from '@components/core/Button';
import homepageData from '@data/homepage.json';
import { useCmsData } from '../../hooks/useCmsData';

const videoSrc = '/videos/hero.mp4';
const heroPoster = typeof heroPosterRaw === 'string' ? heroPosterRaw : (heroPosterRaw as any).src;

interface HeroProps {
  isLoaded: boolean;
}

const Hero: React.FC<HeroProps> = ({ isLoaded }) => {
  const pageData = useCmsData('homepage', homepageData)
  const s1 = pageData.homepage.sections.find((s: any) => s.id === 'S1')!

  // Start animations only after preloader exits (or immediately on repeat visits)
  const [ready, setReady] = useState(
    () => typeof sessionStorage !== 'undefined' && !!sessionStorage.getItem('crystal-preloader-done')
  );
  useEffect(() => {
    if (ready) return;
    const handler = () => setReady(true);
    window.addEventListener('preloader:done', handler);
    // fallback: if event never fires (e.g. no preloader), start after short delay
    const t = setTimeout(() => setReady(true), 1600);
    return () => { window.removeEventListener('preloader:done', handler); clearTimeout(t); };
  }, []);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isPlaying) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleMuteKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
      }
    }
  };

  const textRevealVariants = {
    hidden: { y: "120%" },
    visible: {
      y: 0,
      transition: { duration: 0.65, ease: EASE }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASE }
    },
  };

  return (
    <section className="min-h-[85vh] md:min-h-[100vh] flex flex-col justify-center bg-primary py-16 md:py-24 pt-24 md:pt-32">
      {/* Text content: stagger container starts opacity:0 — fine, text is not the LCP element */}
      <motion.div
        className="container mx-auto px-6 md:px-12 max-w-[var(--max-width)]"
        variants={containerVariants}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-8 lg:gap-16 mb-12 items-end">
          <motion.div className="flex flex-col items-start translate-y-2 max-w-4xl">
            <div className="overflow-hidden mb-4 block">
              <motion.span variants={textRevealVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary block">
                {s1.eyebrow}
              </motion.span>
            </div>
            <h1 className="font-heading font-extrabold leading-tight-none tracking-tighter uppercase text-display flex flex-col">
              <motion.span variants={wordContainerVariants} className="flex flex-wrap pb-2 text-secondary">
                {s1.headline.split(', ')[0].toUpperCase().split(' ').map((word, wi) => (
                  <React.Fragment key={wi}>
                    <span className="inline-flex whitespace-nowrap mr-[0.25em]">
                      {word.split('').map((char, ci) => (
                        <span key={ci} className="inline-flex overflow-hidden pb-1 -mb-1">
                          <motion.span variants={charVariants} className="inline-block">{char}</motion.span>
                        </span>
                      ))}
                    </span>
                    {' '}
                  </React.Fragment>
                ))}
              </motion.span>
              <motion.span variants={wordContainerVariants} className="flex flex-wrap pb-2 text-accent">
                {s1.headline.split(', ').slice(1).join(', ').toUpperCase().split(' ').map((word, wi) => (
                  <React.Fragment key={wi}>
                    <span className="inline-flex whitespace-nowrap mr-[0.25em]">
                      {word.split('').map((char, ci) => (
                        <span key={ci} className="inline-flex overflow-hidden pb-1 -mb-1">
                          <motion.span variants={charVariants} className="inline-block">{char}</motion.span>
                        </span>
                      ))}
                    </span>
                    {' '}
                  </React.Fragment>
                ))}
              </motion.span>
            </h1>
          </motion.div>

          <motion.div className="flex flex-col items-start pb-1" variants={itemVariants}>
            <p className="text-secondary text-body-lg leading-relaxed mb-6 opacity-85">
              {s1.subheadline}
            </p>
            <div className="flex">
              <Button variant="secondary" href="/contact">{s1.cta_secondary}</Button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Video: outside stagger container so opacity is NEVER 0 — browser records LCP immediately */}
      <div className="container mx-auto px-6 md:px-12 max-w-[var(--max-width)]">
        <motion.div
          className="relative w-full h-[35vh] md:h-[45vh] min-h-[300px] md:min-h-[400px] overflow-hidden cursor-none rounded-sm group shadow-2xl"
          style={{ aspectRatio: '16/9', contain: 'layout paint' }}
          ref={wrapperRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={togglePlay}
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            poster={heroPoster}
            className="w-full h-full object-cover grayscale-[0.1] transition-transform duration-1000 group-hover:scale-110"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />

          {/* Mute / unmute — always visible, top-right */}
          <button
            className="absolute top-6 right-6 bg-primary/10 backdrop-blur-md border border-primary/20 text-primary w-11 h-11 flex items-center justify-center text-xl cursor-default z-10 transition-all hover:bg-accent hover:text-secondary hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            onClick={toggleMute}
            onKeyDown={handleMuteKeyDown}
            onMouseEnter={() => setIsHovering(false)}
            onMouseLeave={() => setIsHovering(true)}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <FiVolumeX /> : <FiVolume2 />}
          </button>

          {/* Mobile play/pause — bottom-left, visible only on touch devices */}
          <button
            className="lg:hidden absolute bottom-5 left-5 bg-primary/20 backdrop-blur-md border border-primary/20 text-primary w-11 h-11 flex items-center justify-center text-lg z-10 rounded-sm transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            aria-pressed={!isPlaying}
          >
            {isPlaying ? <FiPause /> : <FiPlay />}
          </button>

          {/* Desktop hover cursor bubble */}
          <div
            className={`hidden lg:flex absolute w-[100px] h-[100px] bg-accent text-secondary rounded-full flex-col items-center justify-center pointer-events-none z-20 transition-transform duration-400 ease-out origin-center ${isHovering ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              transform: `translate(-50%, -50%) ${isHovering ? 'scale(1)' : 'scale(0)'}`
            }}
          >
            <div className="text-2xl mb-1">
              {isPlaying ? <FiPause /> : <FiPlay />}
            </div>
            <span className="text-eyebrow font-heading font-extrabold tracking-widest">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
