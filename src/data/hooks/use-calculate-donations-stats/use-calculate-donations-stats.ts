import { DonatedItemModel, DonatedServicesType } from '@/shared/models';

interface CalculateDonationsStatsProps {
  donatedItems: DonatedItemModel[];
}

interface CalculateDonationsStatsReturn {
  totalSupporters: number;
  benefitedStudents: number;
  reusableElectronics: DonatedItemModel[];
}

export function useCalculateDonationsStats({
  donatedItems,
}: CalculateDonationsStatsProps): CalculateDonationsStatsReturn {
  const totalSupporters = donatedItems?.length;
  const reusableElectronics = donatedItems?.filter(
    (donatedItem) =>
      donatedItem.item !==
      (DonatedServicesType.SUPORTSERVICES ||
        DonatedServicesType.RECYCLESERVICES),
  );
  let benefitedStudents = 0;
  const schoolReusableElectronics = reusableElectronics?.reduce(
    (totalSchools, donatedItem) => {
      const schoolId = donatedItem.school.id;

      if (!totalSchools[schoolId]) {
        totalSchools[schoolId] = {
          school: donatedItem.school,
          equipmentCount: 0,
        };
      }

      totalSchools[schoolId].equipmentCount += 1;

      return totalSchools;
    },
    {},
  );

  for (const schoolId in schoolReusableElectronics) {
    const { school } = schoolReusableElectronics[schoolId];

    if (school?.quantityOfStudents) {
      benefitedStudents += school.quantityOfStudents;
    }
  }

  return {
    totalSupporters,
    benefitedStudents,
    reusableElectronics,
  };
}
