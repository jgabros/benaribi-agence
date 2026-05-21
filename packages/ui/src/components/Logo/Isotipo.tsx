import type { SVGAttributes } from 'react';

interface IsotipoProps extends SVGAttributes<SVGSVGElement> {
  fill?: string;
  size?: number | string;
}

/**
 * Arco de herradura — Benaribi brand mark.
 * Legible at 16×16 via simplified arch silhouette.
 * Outer arch: radius 20, springing at y=24. Inner void: radius 13, springing at y=27.
 * fillRule=evenodd cuts the opening from the solid form.
 */
export const Isotipo = ({
  fill = 'var(--color-champagne-gold)',
  size = 40,
  className,
  ...props
}: IsotipoProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 48"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path
      fillRule="evenodd"
      fill={fill}
      d="M0 48 L0 24 A20 20 0 0 1 40 24 L40 48 Z M7 48 L7 27 A13 13 0 0 1 33 27 L33 48 Z"
    />
  </svg>
);

export type { IsotipoProps };
