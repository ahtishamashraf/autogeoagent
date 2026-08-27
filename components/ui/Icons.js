export function ArrowRight({ className = 'size-4', ...rest }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className} {...rest}>
      <path
        d="M2.5 8h11m0 0L9.5 4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowDown({ className = 'size-4', ...rest }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className} {...rest}>
      <path
        d="M8 2.5v11m0 0 4-4m-4 4-4-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check({ className = 'size-3.5', ...rest }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className} {...rest}>
      <path
        d="m3.5 8.5 3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Spark({ className = 'size-4', ...rest }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className} {...rest}>
      <path
        d="M8 1.5 9.4 6 14 7.4 9.4 8.8 8 13.4 6.6 8.8 2 7.4 6.6 6 8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Plus({ className = 'size-4', ...rest }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className} {...rest}>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Menu({ className = 'size-5', ...rest }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} {...rest}>
      <path d="M3 6h14M3 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Close({ className = 'size-5', ...rest }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} {...rest}>
      <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
