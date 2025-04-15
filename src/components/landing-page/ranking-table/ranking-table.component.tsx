import { RankingModel } from '@/shared/models';

import { DataTableComponent } from '@/components';

import { rankingTableColumns } from './ranking-table-columns.component';

interface RankingTableComponentProps {
  ranking: RankingModel[];
}

export function RankingTableComponent({
  ranking,
}: RankingTableComponentProps): JSX.Element {
  return (
    <DataTableComponent
      columns={rankingTableColumns}
      data={ranking.slice(3)}
      pageSize={5}
      showCustomColumns={false}
    />
  );
}
