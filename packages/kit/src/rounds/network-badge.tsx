'use client';
import { useMemo } from 'react';

import { supportedChains } from '..';
import { cn } from '../lib/utils';
import { Badge } from '../ui/badge';

export function RoundNetworkBadge({ chainId }: { chainId?: number }) {
  const network = useMemo(
    () => supportedChains?.find((chain) => chain.id === chainId),
    [chainId],
  );
  if (!network) return null;

  return (
    <Badge variant="secondary" className={cn('capitalize')}>
      {network.name}
    </Badge>
  );
}
