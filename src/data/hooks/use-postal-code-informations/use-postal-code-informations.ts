/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import { PostalCodeInformationsModel } from '@/shared/models';

interface PostalCodeInformationsStatsReturn {
  handlePostalCodeSearch: (
    schoolPostalCode: string,
  ) => Promise<PostalCodeInformationsModel | undefined>;
  loadingPostalCodeSearch: boolean;
  setLoadingPostalCodeSearch: Dispatch<SetStateAction<boolean>>;
  errorPostalCodeSearch: string;
}

export function usePostalCodeInformations(): PostalCodeInformationsStatsReturn {
  const [loadingPostalCodeSearch, setLoadingPostalCodeSearch] =
    useState<boolean>(false);
  const [errorPostalCodeSearch, setErrorPostalCodeSearch] =
    useState<string>('');

  const handlePostalCodeSearch = async (
    schoolPostalCode: string,
  ): Promise<PostalCodeInformationsModel | undefined> => {
    setLoadingPostalCodeSearch(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CEP_API}/${schoolPostalCode}`,
      );
      const data = await response.json();

      if (data.errors) {
        setErrorPostalCodeSearch('CEP não encontrado.');
      }

      return (data as PostalCodeInformationsModel) || null;
    } catch (serverError: unknown) {
      setErrorPostalCodeSearch(
        'Serviço indisponível. Por favor, tente novamente mais tarde.',
      );
    } finally {
      setLoadingPostalCodeSearch(false);
    }
  };

  return {
    handlePostalCodeSearch,
    loadingPostalCodeSearch,
    setLoadingPostalCodeSearch,
    errorPostalCodeSearch,
  };
}
