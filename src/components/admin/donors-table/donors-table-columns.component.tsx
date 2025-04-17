'use client';

import { ArrowsUpDownIcon, PencilIcon } from '@heroicons/react/24/outline';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { formatDocument, formatPhone } from '@/shared/utils';

import { ButtonComponent } from '@/components';

export type DonorsTableColumns = {
  id: number;
  name: string;
  document: string;
  email: string;
  mobile: string;
  site: string;
};

export const DonorsTableColumns: ColumnDef<DonorsTableColumns>[] = [
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
    accessorKey: 'document',
    header: 'Documento',
    cell: ({ row }) => {
      const document = row.original.document;

      return <>{formatDocument(document)}</>;
    },
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
  },
  {
    accessorKey: 'mobile',
    header: 'Celular',
    cell: ({ row }) => {
      const mobile = row.original.mobile;

      return <>{formatPhone(mobile)}</>;
    },
  },
  {
    accessorKey: 'site',
    header: 'Website',
  },
  {
    id: 'edit',
    cell: ({ row }) => {
      const donor = row.original;

      return (
        <div className="flex justify-end">
          <Link className="inline-flex p-2" href={`/admin/donors/${donor.id}`}>
            <PencilIcon className="size-4 text-primary-2" />
          </Link>
        </div>
      );
    },
  },
];
