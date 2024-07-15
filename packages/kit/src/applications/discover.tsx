'use client';

import { ApplicationCard } from './card';
import { ApplicationsQuery } from '../api/types';
import { useApplications } from '../hooks/useApplications';
import { Grid, GridProps } from '../ui/grid';

export function DiscoverApplications({
  query,
  ...props
}: GridProps<ApplicationCard> & { query?: ApplicationsQuery }) {
  const applications = useApplications(query!);
  return (
    <Grid
      component={ApplicationCard}
      keys={['projectId']}
      {...applications}
      {...props}
    />
  );
}
