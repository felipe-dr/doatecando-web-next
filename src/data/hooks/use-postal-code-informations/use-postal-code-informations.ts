'use client';

import { PostalCodeInformationsModel } from '@/shared/models';
import { useEffect, useState } from 'react';

interface PostalCodeInformationsStatsProps {
  schoolPostalCode: string;
}

interface PostalCodeInformationsStatsReturn {
  postalCodeInformations: PostalCodeInformationsModel | null;
  error: string;
}

export function usePostalCodeInformations({
  schoolPostalCode,
}: PostalCodeInformationsStatsProps): PostalCodeInformationsStatsReturn {
  const [error, setError] = useState<string>('');
  const [postalCodeInformations, setPostalCodeInformations] =
    useState<PostalCodeInformationsModel | null>(null);

  const handleSearchPostalCode = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CEP_API}/${schoolPostalCode}`,
      );
      const data = await response.json();
      console.log(data);

      if (data.errors) {
        setError('CEP não encontrado.');
        console.log(data);
        console.log(data.error);
        return null;
      }

      setPostalCodeInformations(data as PostalCodeInformationsModel);
    } catch (error: unknown) {
      setError('Serviço indisponível. Por favor, tente novamente mais tarde.');
    }
  };

  useEffect(() => {
    handleSearchPostalCode();
  }, []);

  return {
    postalCodeInformations,
    error,
  };
}
