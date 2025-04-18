'use client';

import {
  ArrowsUpDownIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { UrgencyEnum } from '@/shared/models';
import { formatPostalCode } from '@/shared/utils';

import {
  AlertDialogBoxComponent,
  AlertDialogComponent,
  AlertDialogTriggerComponent,
  ButtonComponent,
  DeleteSchoolButtonComponent,
} from '@/components';

export type SchoolsTableColumns = {
  id: number;
  name: string;
  street: string;
  number: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  neighbourhood: string;
  unprivilegedArea: boolean;
  urgency: string;
  quantityOfStudents: number;
  availability: string;
  phone?: string;
  email: string;
};

export const SchoolsTableColumns: ColumnDef<SchoolsTableColumns>[] = [
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
    accessorKey: 'postalCode',
    header: ({ column }) => {
      return (
        <ButtonComponent
          className="!px-0 py-6"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          CEP
          <ArrowsUpDownIcon className="ml-2 size-4" />
        </ButtonComponent>
      );
    },
    cell: ({ row }) => {
      const document = row.original.postalCode;

      return <>{formatPostalCode(document)}</>;
    },
  },
  {
    accessorKey: 'street',
    header: 'Rua',
  },
  {
    accessorKey: 'number',
    header: 'Número',
  },
  {
    accessorKey: 'unprivilegedArea',
    header: ({ column }) => {
      return (
        <ButtonComponent
          className="!px-0 py-6"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Área carente
          <ArrowsUpDownIcon className="ml-2 size-4" />
        </ButtonComponent>
      );
    },
    cell: ({ row }) => {
      const unprivilegedArea = row.original.unprivilegedArea;

      return <>{unprivilegedArea ? 'Sim' : 'Não'}</>;
    },
  },
  {
    accessorKey: 'urgency',
    header: ({ column }) => {
      return (
        <ButtonComponent
          className="!px-0 py-6"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nível de urgência
          <ArrowsUpDownIcon className="ml-2 size-4" />
        </ButtonComponent>
      );
    },
    cell: ({ row }) => {
      const urgency = row.original.urgency;

      return <>{UrgencyEnum[urgency]}</>;
    },
  },
  {
    accessorKey: 'availability',
    header: 'Disponibilidade',
  },
  {
    id: 'edit',
    cell: ({ row }) => {
      const school = row.original;

      return (
        <div className="flex justify-end">
          <Link
            className="inline-flex p-2"
            href={`/admin/schools/${school.id}`}
          >
            <PencilIcon className="size-4 text-primary-2" />
          </Link>
        </div>
      );
    },
  },
  {
    id: 'remove',
    cell: ({ row }) => {
      const school = row.original;

      return (
        <button className="p-2">
          <AlertDialogComponent>
            <AlertDialogTriggerComponent asChild>
              <TrashIcon className="size-4 text-error-3" />
            </AlertDialogTriggerComponent>
            <AlertDialogBoxComponent
              title="Tem certeza que deseja remover?"
              description={`A escola "${school.name}" será permanentemente removida.`}
            >
              <DeleteSchoolButtonComponent id={school.id} />
            </AlertDialogBoxComponent>
          </AlertDialogComponent>
        </button>
      );
    },
  },
];
