'use client';

import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { ColumnDef } from '@tanstack/react-table';

import { BadgesEnum } from '@/shared/models';

import { ButtonComponent } from '@/components';

export type DonationsTableColumns = {
  id: number;
  item: string;
  name: string;
  donorEmail: string;
  donorWebsite: string;
  donorName: string;
  donorDocument: string;
  donorMobile: string;
  donorBadges: [string];
  schoolName: string;
};

export const donationsTableColumns: ColumnDef<DonationsTableColumns>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <ButtonComponent
          className="!px-0 py-6"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Id
          <ArrowsUpDownIcon className="ml-2 size-4" />
        </ButtonComponent>
      );
    },
  },
  {
    accessorKey: 'item',
    header: ({ column }) => {
      return (
        <ButtonComponent
          className="!px-0 py-6"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Item
          <ArrowsUpDownIcon className="ml-2 size-4" />
        </ButtonComponent>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <ButtonComponent
          className="!px-0 py-6"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowsUpDownIcon className="ml-2 size-4" />
        </ButtonComponent>
      );
    },
  },
  {
    accessorKey: 'donorEmail',
    header: 'E-mail',
  },
  {
    accessorKey: 'donorWebsite',
    header: 'Website',
  },
  {
    accessorKey: 'donorName',
    header: ({ column }) => {
      return (
        <ButtonComponent
          className="!px-0 py-6"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Doador
          <ArrowsUpDownIcon className="ml-2 size-4" />
        </ButtonComponent>
      );
    },
  },
  {
    accessorKey: 'donorDocument',
    header: 'Documento',
  },
  {
    accessorKey: 'donorMobile',
    header: 'Contato',
  },
  {
    accessorKey: 'donorBadges',
    header: 'Conquistas',
    cell: ({ row }) => {
      const badges = row.original.donorBadges;

      return <>{badges.map((badge) => BadgesEnum[badge]).join(', ')}</>;
    },
  },
  {
    accessorKey: 'schoolName',
    header: ({ column }) => {
      return (
        <ButtonComponent
          className="!px-0 py-6"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Escola
          <ArrowsUpDownIcon className="ml-2 size-4" />
        </ButtonComponent>
      );
    },
  },
];
