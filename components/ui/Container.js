import { cn } from '@/lib/cn';

const widths = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-[1600px]',
};

export default function Container({ as: Tag = 'div', size = 'xl', className, children, ...rest }) {
  return (
    <Tag className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12', widths[size], className)} {...rest}>
      {children}
    </Tag>
  );
}
