'use client';

import { ColumnDef } from '@tanstack/react-table';

import { BadgesEnum } from '@/shared/models';

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

      return <>{badges.map((badge) => BadgesEnum[badge]).join(', ')}</>;
    },
  },
  {
    accessorKey: 'site',
    header: 'Website',
    cell: ({ row }) => {
      const website = row.original.site;

      return (
        <a
          className="lowercase"
          href={`https://${website}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {website}
        </a>
      );
    },
  },
];
