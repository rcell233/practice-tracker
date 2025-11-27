import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Card ---
export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl overflow-hidden shadow-xl", className)}>
    {children}
  </div>
);

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) => {
  const variants = {
    primary: 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/20',
    secondary: 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/20',
    outline: 'border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:bg-zinc-800/50',
    ghost: 'hover:bg-zinc-800/50 text-zinc-400 hover:text-white',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg font-semibold',
  };

  return (
    <button
      className={cn("rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed", variants[variant], sizes[size], className)}
      {...props}
    />
  );
};

// --- Input ---
export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
    {...props}
  />
);

// --- Label ---
export const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-sm font-medium text-zinc-400 mb-1">{children}</label>
);

// --- Badge ---
export const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700", className)}>
    {children}
  </span>
);