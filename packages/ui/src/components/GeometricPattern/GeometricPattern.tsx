import { useId } from 'react';
import type { SVGAttributes } from 'react';
import { cn } from '../../lib/cn';

interface GeometricPatternProps extends SVGAttributes<SVGSVGElement> {
  opacity?: number;
  fill?: string;
  width?: number;
  height?: number;
}

export const GeometricPattern = ({
  opacity = 0.1,
  fill = 'var(--color-champagne-gold)',
  width = 400,
  height = 400,
  className,
  ...props
}: GeometricPatternProps) => {
  const patternId = useId().replace(/:/g, '');

  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn(className)}
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="20"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          {/* Arch tile: outer arch minus inner void via evenodd */}
          <path
            fillRule="evenodd"
            fill={fill}
            opacity={opacity}
            d="M0 24 L0 12 A10 10 0 0 1 20 12 L20 24 Z M3 24 L3 13 A7 7 0 0 1 17 13 L17 24 Z"
          />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${patternId})`} />
    </svg>
  );
};

export type { GeometricPatternProps };
