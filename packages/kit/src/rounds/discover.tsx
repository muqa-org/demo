'use client';

import { RoundCard } from './card';
import { Round, RoundsQuery } from '../api/types';
import { useRounds } from '../hooks/useRounds';
import { Grid, GridProps } from '../ui/grid';

export function DiscoverRounds({
  query,
  ...props
}: GridProps<Round> & { query?: RoundsQuery }) {
  const rounds = useRounds(query!);
  return <Grid component={RoundCard} {...rounds} {...props} />;
}
