'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import MobileNavigation from './MobileNavigation';
import { navigation } from '@/lib/routes';
import { site } from '@/lib/site';
import { cn } from '@/lib/cn';
import { useScrolledPast } from '@/lib/hooks';

const menus = [
  { id: 'product', label: 'Product', items: navigation.product },
  { id: 'seo', label: 'SEO', href: '/seo-automation' },
  { id: 'geo', label: 'GEO', href: '/geo-optimization' },
  { id: 'how', label: 'How It Works', href: '/how-it-works' },
  { id: 'pricing', label: 'Pricing', href: '/pricing' },
  { id: 'resources', label: 'Resources', items: navigation.resources },
];

function Dropdown({ menu, open, onOpen, onClose, pathname }) {
  const timer = useRef(0);

  const scheduleClose = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(onClose, 120);
  };
  const cancelClose = () => window.clearTimeout(timer.current);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <li
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        onOpen();
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? onClose() : onOpen())}
        onFocus={onOpen}
        className={cn(
          'flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-muted transition-colors duration-300 hover:text-ink',
          open && 'text-ink',
        )}
      >
        {menu.label}
        <svg
          viewBox="0 0 10 10"
          className={cn('size-2.5 transition-transform duration-300', open && 'rotate-180')}
          aria-hidden="true"
        >
          <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className={cn(
          'absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
        )}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <ul className="panel overflow-hidden p-1.5" role="menu">
          {menu.items.map((item) => (
            <li key={item.href} role="none">
              <Link
                role="menuitem"
                href={item.href}
                onClick={onClose}
                tabIndex={open ? 0 : -1}
                className={cn(
                  'flex items-center justify-between gap-3 rounded-[9px] px-3 py-2.5 text-sm transition-colors duration-200',
                  pathname === item.href
                    ? 'bg-white/[0.06] text-ink'
                    : 'text-muted hover:bg-white/[0.05] hover:text-ink',
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="size-1 rounded-full bg-[var(--scene-glow)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function Header() {
  const scrolled = useScrolledPast(24);
  const pathname = usePathname();
  // Keying the open menu to the current path closes it on navigation without
  // an effect that fights the render.
  const [openState, setOpenState] = useState({ id: null, path: pathname });
  const openMenu = openState.path === pathname ? openState.id : null;
  const setOpenMenu = useCallback(
    (id) => setOpenState({ id, path: pathname }),
    [pathname],
  );

  const close = useCallback(() => setOpenState({ id: null, path: pathname }), [pathname]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpenState((current) => ({ ...current, id: null }));
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500',
        scrolled ? 'glass-header' : 'border-b border-transparent bg-transparent',
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-full bg-white px-4 py-2 text-sm font-medium text-void focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-[var(--header-h)] w-full max-w-[1600px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo markClassName="size-7 sm:size-8" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {menus.map((menu) =>
              menu.items ? (
                <Dropdown
                  key={menu.id}
                  menu={menu}
                  pathname={pathname}
                  open={openMenu === menu.id}
                  onOpen={() => setOpenMenu(menu.id)}
                  onClose={close}
                />
              ) : (
                <li key={menu.id}>
                  <Link
                    href={menu.href}
                    className={cn(
                      'block rounded-full px-3 py-2 text-sm transition-colors duration-300',
                      pathname === menu.href ? 'text-ink' : 'text-muted hover:text-ink',
                    )}
                  >
                    {menu.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href={site.app.login} variant="ghost" size="sm" magnetic={false}>
            Login
          </Button>
          <Button href={site.app.signup} variant="primary" size="sm">
            Get Started
          </Button>
        </div>

        <MobileNavigation />
      </div>
    </header>
  );
}
