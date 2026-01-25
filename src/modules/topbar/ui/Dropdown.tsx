import { useState, useRef, useEffect, ReactNode, HTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/cn';

// Dropdown Root
interface DropdownProps {
  children: ReactNode;
}

export function Dropdown({ children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={ref} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

// Context
interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a Dropdown');
  }
  return context;
}

import React from 'react';

// Trigger
interface DropdownTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const { isOpen, setIsOpen } = useDropdownContext();
    
    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={cn('cursor-pointer', className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
DropdownTrigger.displayName = 'DropdownTrigger';

// Content
interface DropdownContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'end';
}

export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, className, align = 'start', ...props }, ref) => {
    const { isOpen } = useDropdownContext();

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'absolute top-full mt-1 min-w-[180px] rounded-md shadow-lg z-[70]',
          'bg-slate-800 border border-slate-700',
          'py-1',
          'animate-in fade-in-0 zoom-in-95',
          align === 'start' && 'left-0',
          align === 'end' && 'right-0',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownContent.displayName = 'DropdownContent';

// Item
interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  asChild?: boolean;
}

export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ children, className, disabled, onClick, ...props }, ref) => {
    const { setIsOpen } = useDropdownContext();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(e);
      setIsOpen(false);
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        onClick={handleClick}
        className={cn(
          'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer',
          'text-white/80 hover:bg-slate-700 hover:text-white',
          'transition-colors',
          disabled && 'opacity-50 pointer-events-none cursor-default',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownItem.displayName = 'DropdownItem';

// Separator
export const DropdownSeparator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('h-px my-1 bg-slate-700', className)}
      {...props}
    />
  )
);
DropdownSeparator.displayName = 'DropdownSeparator';

// Label
export const DropdownLabel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-3 py-1.5 text-xs font-medium text-white/50', className)}
      {...props}
    />
  )
);
DropdownLabel.displayName = 'DropdownLabel';
