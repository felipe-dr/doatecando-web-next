'use client';

import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { ColumnDef } from '@tanstack/react-table';

import { BadgesEnum, DonatedResourcesEnum } from '@/shared/models';
import { formatDocument, formatPhone } from '@/shared/utils';

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
    cell: ({ row }) => {
      const items = row.original.item;

      return <>{DonatedResourcesEnum[items]}</>;
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
    cell: ({ row }) => {
      const email = row.original.donorEmail;

      return <span className="lowercase">{email}</span>;
    },
  },
  {
    accessorKey: 'donorWebsite',
    header: 'Website',
    cell: ({ row }) => {
      const website = row.original.donorWebsite;

      return <span className="lowercase">{website}</span>;
    },
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
    cell: ({ row }) => {
      const document = row.original.donorDocument;

      return <>{formatDocument(document)}</>;
    },
  },
  {
    accessorKey: 'donorMobile',
    header: 'Celular',
    cell: ({ row }) => {
      const mobile = row.original.donorMobile;

      return <>{formatPhone(mobile)}</>;
    },
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
