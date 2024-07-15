import { ChevronLeft } from 'lucide-react';
import { ComponentProps } from 'react';

import { Button } from './button';
import { cn } from '../lib/utils';

export function BackButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      variant={'ghost'}
      size="icon"
      className={cn('rounded-full', className)}
      icon={ChevronLeft}
      {...props}
    />
  );
}
