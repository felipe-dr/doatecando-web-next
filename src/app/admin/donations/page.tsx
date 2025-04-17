import Link from 'next/link';

import { getDonatedItemsHttp } from '@/http';

import { cn } from '@/shared/libs';

import {
  buttonVariants,
  ContentWrapperHeaderComponent,
  ContentWrapperSectionComponent,
  DonationsTableComponent,
  NavigationBreadcrumbComponent,
} from '@/components';

export default async function DonationsAdminPage(): Promise<JSX.Element> {
  const donations = await getDonatedItemsHttp({ limit: 1000 });

  const breadcrumbItems = [
    {
      label: 'doações',
      path: '',
    },
  ];

  return (
    <>
      <ContentWrapperHeaderComponent title="doações">
        <NavigationBreadcrumbComponent
          className="m-0 mb-3 md:m-0 lg:m-0"
          breadcrumbItems={breadcrumbItems}
        />
        <Link
          className={cn(
            buttonVariants({ variant: 'admin', color: 'primary' }),
            'justify-self-end',
          )}
          href="/admin/donations/add"
        >
          Adicionar
        </Link>
      </ContentWrapperHeaderComponent>
      <ContentWrapperSectionComponent>
        {donations?.length ? (
          <DonationsTableComponent donations={donations} />
        ) : (
          <p>Não há doações disponíveis no momento.</p>
        )}
      </ContentWrapperSectionComponent>
    </>
  );
}
