import React from 'react';
import type { ReactNode } from 'react';

export type CardVariant = 'default' | 'bordered' | 'muted';

export interface PdfCardProps {
  style?: React.CSSProperties;
  title?: string;
  children?: ReactNode;
  variant?: CardVariant;
  padding?: 'sm' | 'md' | 'lg';
  wrap?: boolean;
  className?: string;
}

/**
 * Universal Card component following PDF/Web primitive specification.
 */
export function PdfCard({
  title,
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  style,
}: PdfCardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const variantClasses = {
    default: 'bg-white border border-slate-200/80 shadow-lg rounded-3xl',
    bordered: 'bg-white border-2 border-[#4582ff] shadow-xl rounded-3xl',
    muted: 'bg-slate-50 border border-slate-200/60 rounded-3xl',
  };

  return (
    <div
      style={style}
      className={`relative overflow-hidden transition-all duration-300 ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
    >
      {title ? (
        <div className="font-display font-extrabold text-lg text-[#0f2239] pb-3 mb-4 border-b border-slate-100 flex items-center justify-between">
          <span>{title}</span>
        </div>
      ) : null}
      {typeof children === 'string' ? (
        <p className="text-xs text-[#636363] leading-relaxed">{children}</p>
      ) : (
        children
      )}
    </div>
  );
}
