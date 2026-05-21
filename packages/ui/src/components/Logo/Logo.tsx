import { cn } from '../../lib/cn';
import { Isotipo } from './Isotipo';

interface LogoProps {
  fill?: string;
  size?: number | string;
  className?: string;
}

export const Logo = ({ fill, size, className }: LogoProps) => (
  <div className={cn('inline-flex items-center gap-3', className)}>
    <Isotipo fill={fill} size={size} />
    <span className="font-display text-h4 tracking-wide leading-none">
      Benaribi Agence
    </span>
  </div>
);

export type { LogoProps };
