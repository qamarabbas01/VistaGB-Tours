import type { ReactNode } from 'react';

const WRAPPER_FROM = {
  md: 'md:h-0 md:min-h-full',
  lg: 'lg:h-0 lg:min-h-full',
} as const;

const STICKY_FROM = {
  md: 'md:sticky md:top-[var(--sticky-sidebar-top)] md:z-10 md:max-h-[min(var(--sticky-sidebar-max-height),100%)] md:overflow-x-hidden md:overflow-y-auto md:overscroll-contain',
  lg: 'lg:sticky lg:top-[var(--sticky-sidebar-top)] lg:z-10 lg:max-h-[min(var(--sticky-sidebar-max-height),100%)] lg:overflow-x-hidden lg:overflow-y-auto lg:overscroll-contain',
} as const;

type Props = {
  children: ReactNode;
  className?: string;
  /** Match the breakpoint where the two-column layout starts. */
  from?: keyof typeof STICKY_FROM;
};

export function StickySidebar({
  children,
  className = '',
  from = 'lg',
}: Props) {
  return (
    <div className={`min-w-0 ${WRAPPER_FROM[from]} ${className}`.trim()}>
      <aside
        className={`flex min-w-0 flex-col gap-6 ${STICKY_FROM[from]}`.trim()}
      >
        {children}
      </aside>
    </div>
  );
}
