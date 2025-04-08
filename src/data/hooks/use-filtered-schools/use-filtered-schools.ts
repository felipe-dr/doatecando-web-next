'use client';

import { useEffect, useState } from 'react';

import { SchoolModel } from '@/shared/models';

interface FilteredSchoolsProps {
  schools: SchoolModel[];
  searchQuery: string;
}

interface FilteredSchoolsReturn {
  filteredSchools: SchoolModel[] | [];
}

export function useFilteredSchools({
  schools,
  searchQuery,
}: FilteredSchoolsProps): FilteredSchoolsReturn {
  const [filteredSchools, setFilteredSchools] = useState<SchoolModel[]>([]);

  useEffect(() => {
    if (searchQuery) {
      const queryInLowercase = searchQuery.toLowerCase();
      const filtered = schools.filter(
        (school) =>
          school.name.toLowerCase().includes(queryInLowercase) ||
          school.street.toLowerCase().includes(queryInLowercase) ||
          school.postalCode.includes(searchQuery),
      );
      setFilteredSchools(filtered);
    } else {
      setFilteredSchools(schools);
    }
  }, [searchQuery, schools]);

  return { filteredSchools };
}
