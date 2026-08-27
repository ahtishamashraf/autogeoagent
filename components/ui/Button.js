'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { ArrowRight } from './Icons';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  accent: 'btn-accent',
};

const sizes = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

/**
 * Buttons pick up a subtle magnetic pull on fine-pointer devices. Touch and
 * reduced-motion users get a completely static control.
 */
function useMagnetic(strength = 0.28) {
  const ref = useRef(null);
  const raf = useRef(0);

  const enabled = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onPointerMove = (event) => {
    const el = ref.current;
    if (!el || !enabled()) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    });
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transform = '';
  };

  return { ref, onPointerMove, onPointerLeave };
}

export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  withArrow = false,
  external,
  magnetic = true,
  ...rest
}) {
  const magnet = useMagnetic(magnetic ? 0.22 : 0);
  const classes = cn('btn', variants[variant], sizes[size], className);

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow ? (
        <ArrowRight className="relative z-10 size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1" />
      ) : null}
    </>
  );

  const magnetProps = magnetic
    ? {
        ref: magnet.ref,
        onPointerMove: magnet.onPointerMove,
        onPointerLeave: magnet.onPointerLeave,
      }
    : {};

  const isExternal = external ?? (typeof href === 'string' && href.startsWith('http'));

  if (href && isExternal) {
    return (
      <a
        href={href}
        className={cn(classes, 'group/btn')}
        rel="noopener"
        {...magnetProps}
        {...rest}
      >
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={cn(classes, 'group/btn')} {...magnetProps} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={cn(classes, 'group/btn')} {...magnetProps} {...rest}>
      {content}
    </button>
  );
}
