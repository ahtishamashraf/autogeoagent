'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/lib/routes';
import { site } from '@/lib/site';
import { cn } from '@/lib/cn';
import { Close, Menu } from '@/components/ui/Icons';
import Logo from '@/components/ui/Logo';

const groups = [
  { title: 'Product', items: navigation.product },
  { title: 'Learn', items: navigation.resources },
  { title: 'Company', items: [...navigation.company, { label: 'Pricing', href: '/pricing' }] },
];

export default function MobileNavigation() {
  const pathname = usePathname();
  // The panel is keyed to the path it was opened on, so navigating closes it
  // without an effect that re-renders after paint.
  const [openPath, setOpenPath] = useState(null);
  const open = openPath === pathname;
  const setOpen = useCallback(
    (next) => setOpenPath(next ? pathname : null),
    [pathname],
  );

  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const raf = requestAnimationFrame(() => {
      panelRef.current?.querySelector('a, button')?.focus();
    });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, setOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-ink transition-colors hover:bg-white/[0.08] lg:hidden"
      >
        <Menu />
        <span className="sr-only">Open menu</span>
      </button>

      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        hidden={!open}
        className={cn('fixed inset-0 z-[70] lg:hidden', !open && 'pointer-events-none')}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={cn(
            'absolute inset-0 bg-void/85 backdrop-blur-sm transition-opacity duration-400',
            open ? 'opacity-100' : 'opacity-0',
          )}
        />

        <div
          ref={panelRef}
          className={cn(
            'absolute inset-x-0 top-0 max-h-[100svh] overflow-y-auto border-b border-white/10 bg-abyss/98 pb-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            open ? 'translate-y-0' : '-translate-y-full',
          )}
        >
          <div className="flex h-[var(--header-h)] items-center justify-between px-5">
            <Logo markClassName="size-7" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-ink"
            >
              <Close />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-2 px-5">
            {groups.map((group) => (
              <div key={group.title} className="border-t border-white/8 py-5">
                <p className="t-micro mb-3 text-faint">{group.title}</p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'block rounded-lg py-2.5 font-display text-lg tracking-[-0.02em] transition-colors',
                          pathname === item.href ? 'text-[var(--scene-glow)]' : 'text-ink-soft',
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mt-6 grid gap-3">
              <a href={site.app.signup} rel="noopener" className="btn btn-primary btn-lg w-full">
                Get Started
              </a>
              <a href={site.app.login} rel="noopener" className="btn btn-secondary btn-lg w-full">
                Login
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
