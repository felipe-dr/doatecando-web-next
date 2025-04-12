import { DonatedItemModel, DonorModel } from '@/shared/models';

interface DonorDetailsModel extends Partial<DonorModel> {
  totalItemsDonated: number;
}

interface DonorRankingProps {
  donatedItems: DonatedItemModel[];
}

interface DonorRankingReturn {
  donorsRanking: DonorDetailsModel[];
}

export function useDonorRanking({
  donatedItems,
}: DonorRankingProps): DonorRankingReturn {
  const donors: Record<number, DonorDetailsModel> = {};

  donatedItems.forEach((donatedItem) => {
    const donor = donatedItem.donor;

    if (!donors[donor.id]) {
      donors[donor.id] = {
        id: donor.id,
        email: donor.email,
        site: donor.site,
        name: donor.name,
        mobile: donor.mobile,
        badges: donor.badges,
        totalItemsDonated: 0,
      };
    }

    donors[donor.id].totalItemsDonated += 1;
  });

  const sortDonorsDescOrderByAmountDonated = Object.values(donors).sort(
    (a, b) => b.totalItemsDonated - a.totalItemsDonated,
  );
  const donorsRanking = sortDonorsDescOrderByAmountDonated;

  return { donorsRanking };
}
