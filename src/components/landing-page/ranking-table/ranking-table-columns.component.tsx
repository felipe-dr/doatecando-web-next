'use client';

import { BadgesType } from '@/shared/models';
import { ColumnDef } from '@tanstack/react-table';

export type RankingTableColumns = {
  position: string;
  donor: string;
  quantity: number;
  badges: [string];
  site?: string;
};

export const rankingTableColumns: ColumnDef<RankingTableColumns>[] = [
  {
    accessorKey: 'position',
    header: 'Posição',
  },
  {
    accessorKey: 'donor',
    header: 'Doador',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantidade',
  },
  {
    accessorKey: 'badges',
    header: 'Conquistas',
    cell: ({ row }) => {
      const badges = row.original.badges;

      return <>{badges.map((badge) => BadgesType[badge]).join(', ')}</>;
    },
  },
  {
    accessorKey: 'site',
    header: 'Website',
  },
];
