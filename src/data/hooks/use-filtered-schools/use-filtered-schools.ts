'use client';

import { useEffect, useState } from 'react';

import { SchoolModel, UrgencyEnum } from '@/shared/models';

interface FilteredSchoolsProps {
  schools: SchoolModel[];
  searchQuery: string;
}

interface FilteredSchoolsReturn {
  filteredSchoolsByUrgencyAndSearch: SchoolModel[] | [];
}

const urgencyOrder: Record<keyof typeof UrgencyEnum, number> = {
  FIVE: 5,
  FOUR: 4,
  THREE: 3,
  TWO: 2,
  ONE: 1,
};

export function useFilteredSchools({
  schools,
  searchQuery,
}: FilteredSchoolsProps): FilteredSchoolsReturn {
  const [
    filteredSchoolsByUrgencyAndSearch,
    setFilteredSchoolsByUrgencyAndSearch,
  ] = useState<SchoolModel[]>([]);

  useEffect(() => {
    let filteredSchools: SchoolModel[] = [];

    if (searchQuery) {
      const queryInLowercase = searchQuery.toLowerCase();
      filteredSchools = schools.filter(
        (school) =>
          school.name.toLowerCase().includes(queryInLowercase) ||
          school.street.toLowerCase().includes(queryInLowercase) ||
          school.postalCode.includes(searchQuery),
      );
    } else {
      filteredSchools = [...schools];
    }

    filteredSchools.sort((firstSchool, secondSchool) => {
      const firstSchoolUrgency =
        urgencyOrder[
          firstSchool.urgency as unknown as keyof typeof UrgencyEnum
        ] || 0;
      const secondSchoolUrgency =
        urgencyOrder[
          secondSchool.urgency as unknown as keyof typeof UrgencyEnum
        ] || 0;
      return secondSchoolUrgency - firstSchoolUrgency;
    });

    setFilteredSchoolsByUrgencyAndSearch(filteredSchools);
  }, [searchQuery, schools]);

  return { filteredSchoolsByUrgencyAndSearch };
}
