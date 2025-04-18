import { SchoolModel } from '@/shared/models';

import { DataTableComponent } from '@/components';

import { SchoolsTableColumns } from './schools-table-columns.component';

interface SchoolsTableComponentProps {
  schools: SchoolModel[];
}

export function SchoolsTableComponent({
  schools,
}: SchoolsTableComponentProps): JSX.Element {
  return (
    <DataTableComponent
      columns={SchoolsTableColumns}
      data={schools}
      filter={{ placeholder: 'nome da escola', term: 'name' }}
    />
  );
}
