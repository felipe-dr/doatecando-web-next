import { DonorModel } from '@/shared/models';

import { DataTableComponent } from '@/components';

import { DonorsTableColumns } from './donors-table-columns.component';

interface DonorsTableComponentProps {
  donors: DonorModel[];
}

export function DonorsTableComponent({
  donors,
}: DonorsTableComponentProps): JSX.Element {
  return (
    <DataTableComponent
      columns={DonorsTableColumns}
      data={donors}
      filter={{ placeholder: 'nome do doador', term: 'name' }}
    />
  );
}
