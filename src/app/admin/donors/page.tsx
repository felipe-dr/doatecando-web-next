import Link from 'next/link';

import { getDonorsHttp } from '@/http';

import { cn } from '@/shared/libs';

import {
  buttonVariants,
  ContentWrapperHeaderComponent,
  ContentWrapperSectionComponent,
  DonorsTableComponent,
  NavigationBreadcrumbComponent,
} from '@/components';

export default async function DonorsAdminPage(): Promise<JSX.Element> {
  const donors = await getDonorsHttp({ limit: 1000 });

  const breadcrumbItems = [
    {
      label: 'doadores',
      path: '',
    },
  ];

  return (
    <>
      <ContentWrapperHeaderComponent title="doadores">
        <NavigationBreadcrumbComponent
          className="m-0 mb-3 md:m-0 lg:m-0"
          breadcrumbItems={breadcrumbItems}
        />
        <Link
          className={cn(
            buttonVariants({ variant: 'admin', color: 'primary' }),
            'justify-self-end',
          )}
          href="/admin/donors/add"
        >
          Adicionar
        </Link>
      </ContentWrapperHeaderComponent>
      <ContentWrapperSectionComponent>
        {donors?.length ? (
          <DonorsTableComponent donors={donors} />
        ) : (
          <p>Não há doadores disponíveis no momento.</p>
        )}
      </ContentWrapperSectionComponent>
    </>
  );
}
