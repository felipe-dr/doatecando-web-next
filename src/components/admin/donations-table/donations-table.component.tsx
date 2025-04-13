import { DonatedItemModel } from '@/shared/models';

import { DataTableComponent } from '@/components';

import {
  DonationsTableColumns,
  donationsTableColumns,
} from './donations-table-columns.component';

interface DonationsTableComponentProps {
  donations: DonatedItemModel[];
}

export function DonationsTableComponent({
  donations,
}: DonationsTableComponentProps): JSX.Element {
  let donatedItems: DonationsTableColumns[] = [];

  if (donations) {
    donatedItems = donations.map((donation) => {
      return {
        id: Number(donation.id),
        item: donation.item,
        name: donation.name,
        donorEmail: donation.donor.email,
        donorWebsite: donation.donor.site,
        donorName: donation.donor.name,
        donorDocument: donation.donor.document,
        donorMobile: donation.donor.mobile,
        donorBadges: donation.donor.badges,
        schoolName: donation.school.name,
      };
    });
  }

  return (
    <DataTableComponent
      columns={donationsTableColumns}
      data={donatedItems}
      filter={{ placeholder: 'nome do doador', term: 'donorName' }}
    />
  );
}
