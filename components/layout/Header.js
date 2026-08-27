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

/**
 * Primary navigation.
 *
 * Menus with `columns` open as a viewport-centred mega panel — centring on the
 * viewport rather than the trigger means a wide panel can never be pushed off
 * a narrow laptop screen. Menus with `href` are plain links.
 */
const menus = [
  {
    id: 'product',
    label: 'Product',
    width: 'w-[min(52rem,calc(100vw-3rem))]',
    columns: [
      { title: 'Platform', items: navigation.product },
      { title: 'Capabilities', items: navigation.capabilities },
    ],
    footer: {
      text: 'One agent runs the whole loop — research, creation, optimization and monitoring.',
      link: { label: 'See how it works', href: '/how-it-works' },
    },
  },
  {
    id: 'solutions',
    label: 'Solutions',
    width: 'w-[min(24rem,calc(100vw-3rem))]',
    columns: [{ title: 'By business type', items: navigation.solutions }],
  },
  {
    id: 'resources',
    label: 'Resources',
    width: 'w-[min(46rem,calc(100vw-3rem))]',
    columns: [
      { title: 'Learn', items: navigation.resources },
      { title: 'AI search', items: navigation.aiSearch },
    ],
    footer: {
      text: 'Guides, definitions and reference material, organised in one place.',
      link: { label: 'Browse all resources', href: '/resources' },
    },
  },
  { id: 'pricing', label: 'Pricing', href: '/pricing' },
];

function MenuLink({ item, pathname, onClose, tabbable }) {
  return (
    <li>
      <Link
        href={item.href}
        onClick={onClose}
        tabIndex={tabbable ? 0 : -1}
        className={cn(
          'block rounded-[9px] px-3 py-2 text-sm transition-colors duration-200',
          pathname === item.href
            ? 'bg-white/[0.06] text-ink'
            : 'text-muted hover:bg-white/[0.05] hover:text-ink',
        )}
      >
        {item.label}
      </Link>
    </li>
  );
}

function MegaMenu({ menu, open, onOpen, onClose, pathname }) {
  const timer = useRef(0);

  const scheduleClose = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(onClose, 120);
  };
  const cancelClose = () => window.clearTimeout(timer.current);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <li
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
        aria-controls={`menu-${menu.id}`}
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
        id={`menu-${menu.id}`}
        className={cn(
          'fixed left-1/2 top-[var(--header-h)] -translate-x-1/2 pt-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          menu.width,
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
        )}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div className="panel overflow-hidden">
          <div
            className={cn(
              'grid gap-x-6 gap-y-6 p-4',
              menu.columns.length > 1 && 'sm:grid-cols-2',
            )}
          >
            {menu.columns.map((column) => (
              <div key={column.title}>
                <p className="t-micro mb-2 px-3 text-faint">{column.title}</p>
                <ul>
                  {column.items.map((item) => (
                    <MenuLink
                      key={item.href}
                      item={item}
                      pathname={pathname}
                      onClose={onClose}
                      tabbable={open}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {menu.footer ? (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/8 bg-white/[0.02] px-7 py-4">
              <p className="max-w-md text-xs leading-relaxed text-faint">{menu.footer.text}</p>
              <Link
                href={menu.footer.link.href}
                onClick={onClose}
                tabIndex={open ? 0 : -1}
                className="link-underline text-xs text-ink-soft transition-colors hover:text-ink"
              >
                {menu.footer.link.label}
              </Link>
            </div>
          ) : null}
        </div>
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
        scrolled || openMenu ? 'glass-header' : 'border-b border-transparent bg-transparent',
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
              menu.columns ? (
                <MegaMenu
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
                    onMouseEnter={close}
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
