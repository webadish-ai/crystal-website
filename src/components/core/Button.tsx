import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  download?: boolean | string;
}

const base =
  'inline-flex items-center justify-center font-heading font-extrabold uppercase tracking-[0.18em] rounded-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2';

const variants: Record<ButtonVariant, string> = {
  /** Amber fill → navy on hover */
  primary:
    'bg-accent text-secondary hover:bg-secondary hover:text-primary shadow-md hover:shadow-xl',
  /** Navy border → navy fill on hover */
  secondary:
    'border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary',
  /** Transparent, white border — for dark backgrounds */
  ghost:
    'border border-primary/30 text-primary hover:border-primary hover:bg-primary/10',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-6 py-3 text-[11px] md:text-[12px]',
  md: 'px-8 py-4 text-[12px] md:text-[13px]',
  lg: 'px-10 py-5 text-[13px] md:text-[14px]',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  onClick,
  target,
  rel,
  type = 'button',
  disabled,
  download,
}) => {
  const classes = [base, variants[variant], sizes[size], className].join(' ');

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel} download={download} suppressHydrationWarning>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
