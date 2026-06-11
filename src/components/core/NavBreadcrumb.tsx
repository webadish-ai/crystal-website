import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiPackage, FiTool, FiTrendingUp, FiTruck, FiThermometer, FiWind, FiBox, FiLayers, FiActivity, FiShield, FiUsers, FiMail } from 'react-icons/fi';

export interface Crumb { name: string; href: string; }

const hrefIconMap: Record<string, React.ReactNode> = {
  '/':                             <FiHome />,
  '/#solutions':                   <FiLayers />,
  '/build/built-to-suit':                    <FiPackage />,
  '/build-epc':                    <FiTool />,
  '/store/cold-storage':           <FiThermometer />,
  '/store-3pl':                    <FiTrendingUp />,
  '#':                             <FiBox />,
  '/store-portable-cold-storage':  <FiBox />,
  '/store/reefer-containers':                 <FiTruck />,
  '/store/blast-freezer':          <FiWind />,
  '/store/super-store':            <FiLayers />,
  '/store/super-freezer':          <FiThermometer />,
  '/store/iso-tanks':               <FiActivity />,
  '/store/amc-spareparts':                    <FiShield />,
  '/move':                         <FiTruck />,
  '/process':                  <FiActivity />,
  '/process-bfs':                  <FiWind />,
  '/solve':                        <FiLayers />,
  '/impact':                       <FiTrendingUp />,
  '/about':                        <FiUsers />,
  '/careers':                      <FiUsers />,
  '/contact':                      <FiMail />,
};

const TypewriterBreadcrumb = ({ text, startDelay = 600 }: { text: string; startDelay?: number }) => {
  const [displayed, setDisplayed] = React.useState('');
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, 45);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, startDelay]);

  return (
    <span className="inline-grid items-center relative">
      <span className="invisible pointer-events-none select-none col-start-1 row-start-1">{text}</span>
      <span className="col-start-1 row-start-1 flex items-center">
        <span>{displayed}</span>
        {!done && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
            className="inline-block ml-[1px] w-[2px] h-[10px] bg-accent align-middle"
          />
        )}
      </span>
    </span>
  );
};

interface NavBreadcrumbProps {
  breadcrumbs: Crumb[] | null;
  currentPath: string;
  menuOpen: boolean;
  scrolled: boolean;
}

const NavBreadcrumb: React.FC<NavBreadcrumbProps> = ({ breadcrumbs, currentPath, menuOpen, scrolled }) => (
  <AnimatePresence mode="wait">
    {breadcrumbs && !menuOpen && scrolled && (
      <motion.div
        key={currentPath}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        data-breadcrumb
        className="hidden lg:flex absolute top-[calc(100%+20px)] left-6 lg:left-10 z-[95] pointer-events-auto"
      >
        <div className="group/bc bg-primary/95 backdrop-blur-md border border-secondary/10 shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-sm px-3 py-2 flex items-center gap-1">
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            const isClickable = crumb.href && crumb.href !== '#' && !crumb.href.startsWith('/#') && !isLast;
            const icon = hrefIconMap[crumb.href] ?? <FiLayers />;

            const inner = (
              <>
                <span className={`text-[11px] shrink-0 transition-colors duration-300 ${
                  isLast
                    ? 'text-secondary'
                    : isClickable
                    ? 'text-secondary/35 group-hover/crumb:text-accent group-hover/bc:text-secondary/60'
                    : 'text-secondary/30 group-hover/bc:text-secondary/50'
                }`}>
                  {icon}
                </span>
                <span
                  style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  className={`font-heading font-extrabold uppercase tracking-[0.13em] overflow-hidden whitespace-nowrap transition-all duration-500 ${
                    isLast
                      ? 'text-[9px] xl:text-[9.5px] text-secondary max-w-[140px] opacity-100 ml-1'
                      : isClickable
                      ? 'text-[9px] xl:text-[9.5px] text-secondary/50 group-hover/crumb:text-accent max-w-0 opacity-0 group-hover/bc:max-w-[120px] group-hover/bc:opacity-100 group-hover/bc:ml-1'
                      : 'text-[9px] xl:text-[9.5px] text-secondary/40 max-w-0 opacity-0 group-hover/bc:max-w-[120px] group-hover/bc:opacity-100 group-hover/bc:ml-1'
                  }`}
                >
                  {isLast ? <TypewriterBreadcrumb text={crumb.name} /> : crumb.name}
                </span>
              </>
            );

            return (
              <React.Fragment key={i}>
                {isClickable ? (
                  <a href={crumb.href} className="flex items-center gap-0 group/crumb cursor-pointer">{inner}</a>
                ) : (
                  <span className="flex items-center gap-0">{inner}</span>
                )}
                {!isLast && (
                  <span className="text-secondary/20 text-[10px] font-mono leading-none mx-1.5 shrink-0">/</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default NavBreadcrumb;
