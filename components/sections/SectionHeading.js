import { cn } from '@/lib/cn';

/**
 * Editorial section heading. Deliberately asymmetric: eyebrow, rule, heading,
 * optional lead — never centred by default.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  align = 'left',
  as: Tag = 'h2',
  className,
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        align === 'right' && 'ml-auto text-right',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            't-eyebrow flex items-center gap-2.5',
            align === 'center' && 'justify-center',
            align === 'right' && 'justify-end',
          )}
        >
          <span
            aria-hidden="true"
            className="inline-block h-px w-6 bg-[var(--scene-glow)] shadow-[0_0_8px_var(--scene-glow)]"
          />
          {eyebrow}
        </p>
      ) : null}
      <Tag id={id} className="t-h2 mt-5 text-ink">
        {title}
      </Tag>
      {lead ? <p className="t-lead mt-5 max-w-2xl">{lead}</p> : null}
    </div>
  );
}
