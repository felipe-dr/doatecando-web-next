'use client';

import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import {
  useFilteredSchools,
  usePostalCodeInformations,
  useToast,
} from '@/data/hooks';

import {
  PostalCodeInformationsModel,
  SchoolModel,
  UrgencyEnum,
} from '@/shared/models';

import { SpinnerComponent } from '@/components/shared/spinner/spinner.component';
import { TitleComponent } from '@/components/shared/title/title.component';
import { ButtonComponent } from '@/components/ui/button';
import {
  DialogComponent,
  DialogContentComponent,
  DialogHeaderComponent,
  DialogTitleComponent,
  DialogTriggerComponent,
} from '@/components/ui/dialog';
import { InputComponent } from '@/components/ui/input';

import { SchoolMapComponent } from '../school-map/school-map.component';

function changeColorByUrgencyLevel(urgency: string) {
  switch (urgency) {
    case 'ONE':
      return '#8FD748';
    case 'TWO':
      return '#DDC02E';
    case 'THREE':
      return '#FF3A3A';
    case 'FOUR':
      return '#BA1B1B';
    case 'FIVE':
      return '#9A0C0C';
    default:
  }
}

interface SchoolsComponentProps {
  schools: SchoolModel[];
}

export function SchoolsComponent({
  schools,
}: SchoolsComponentProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { filteredSchools } = useFilteredSchools({
    schools,
    searchQuery,
  });
  const [selectedSchool, setSelectedSchool] = useState<SchoolModel | null>(
    null,
  );
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const {
    handlePostalCodeSearch,
    loadingPostalCodeSearch,
    setLoadingPostalCodeSearch,
    errorPostalCodeSearch,
  } = usePostalCodeInformations();
  const { toast } = useToast();

  const showSchoolMap = async (school: SchoolModel) => {
    const hasSchoolMapCoordinates = school.latitude && school.longitude;

    setLoadingPostalCodeSearch(true);

    if (hasSchoolMapCoordinates) {
      setCoordinates({
        latitude: Number(school.latitude),
        longitude: Number(school.longitude),
      });
      setLoadingPostalCodeSearch(false);
    } else {
      const getSchoolMapCoordinates: PostalCodeInformationsModel | undefined =
        await handlePostalCodeSearch(school.postalCode);
      const hasSchoolMapLocation = getSchoolMapCoordinates?.location;

      if (hasSchoolMapLocation) {
        const { latitude, longitude } =
          getSchoolMapCoordinates.location.coordinates;

        setCoordinates({
          latitude: Number(latitude),
          longitude: Number(longitude),
        });
      } else {
        toast({
          title: 'Erro!',
          description: errorPostalCodeSearch,
          variant: 'destructive',
        });
        setCoordinates(null);
      }
    }

    setSelectedSchool(school);
  };

  return (
    <>
      <form className="relative w-full max-w-[27.5rem] md:self-start">
        <>
          <InputComponent
            type="search"
            placeholder="Buscar por nome, rua ou CEP ( 12345678 )"
            value={searchQuery}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(event.target.value)
            }
          />
          <MagnifyingGlassIcon className="absolute right-4 top-1/2 size-[1.042rem] -translate-y-1/2 text-primary-3 lg:right-5 lg:size-[1.34rem]" />
        </>
      </form>
      {filteredSchools.length ? (
        filteredSchools?.map((school: SchoolModel) => (
          <div className="relative" key={school.id}>
            <DialogComponent>
              <DialogTriggerComponent asChild>
                <ButtonComponent
                  className="absolute right-0 top-0 text-primary-2"
                  onClick={() => showSchoolMap(school)}
                >
                  <MapPinIcon className="text-primary-3" />
                  Abrir mapa
                </ButtonComponent>
              </DialogTriggerComponent>
              {selectedSchool &&
                selectedSchool.id === school.id &&
                !loadingPostalCodeSearch &&
                coordinates && (
                  <DialogContentComponent className="sm:max-w-screen-sm">
                    <DialogHeaderComponent>
                      <DialogTitleComponent asChild>
                        <TitleComponent tag="h3" hasDotDecorator={false}>
                          {selectedSchool?.name}
                        </TitleComponent>
                      </DialogTitleComponent>
                    </DialogHeaderComponent>
                    <SchoolMapComponent
                      postalCodeInformations={{
                        id: school.id,
                        name: school.name,
                        location: coordinates,
                      }}
                    />
                  </DialogContentComponent>
                )}
              {loadingPostalCodeSearch && (
                <div className="fixed inset-0 z-[100] flex h-screen w-full items-center justify-center bg-base-black/40">
                  <SpinnerComponent />
                </div>
              )}
            </DialogComponent>
            <dl className="my-9 rounded-md border border-base-12 bg-base-15 p-6 pt-7 shadow-md md:flex md:flex-wrap">
              <dt className="font-semibold uppercase text-base-white md:mb-5">
                Escola
              </dt>
              <dd className="mb-4">{school.name}</dd>
              <dt className="font-semibold uppercase text-base-white md:mb-5">
                Urgência
              </dt>
              <dd className="mb-4">
                <span
                  className="mr-2 inline-block size-3 animate-pulse rounded-full"
                  style={{
                    backgroundColor: `${changeColorByUrgencyLevel(school.urgency)}`,
                  }}
                ></span>
                {UrgencyEnum[school.urgency]}
              </dd>
              <dt className="font-semibold uppercase text-base-white md:mb-5">
                Disponibilidade para receber doações
              </dt>
              <dd className="mb-4">{school.availability}</dd>
              <dt className="font-semibold uppercase text-base-white md:mb-5">
                Área carente
              </dt>
              <dd className="mb-4">
                {school.unprivilegedArea ? 'Sim' : 'Não'}
              </dd>
              <dt className="font-semibold uppercase text-base-white md:mb-5">
                Quantidade de estudantes
              </dt>
              <dd className="mb-4">{school.quantityOfStudents}</dd>
              <dt className="font-semibold uppercase text-base-white md:mb-5">
                Contato
              </dt>
              <dd className="mb-4">{school.phone}</dd>
              <dt className="font-semibold uppercase text-base-white md:mb-5">
                E-mail
              </dt>
              <dd className="mb-4">{school.email}</dd>
              <dt className="font-semibold uppercase text-base-white md:mb-5">
                Rua
              </dt>
              <dd className="mb-4">{school.street}</dd>
              <dt className="font-semibold uppercase text-base-white md:mb-5">
                Número
              </dt>
              <dd className="mb-4">{school.number}</dd>
              <dt className="font-semibold uppercase text-base-white md:mb-5">
                CEP
              </dt>
              <dd className="mb-4">{school.postalCode}</dd>
              <dt className="font-semibold uppercase text-base-white md:mb-5">
                Bairro
              </dt>
              <dd className="mb-4">{school.neighbourhood}</dd>
            </dl>
          </div>
        ))
      ) : (
        <p className="mt-8 text-center">
          Não há escolas disponíveis no momento.
        </p>
      )}
    </>
  );
}
