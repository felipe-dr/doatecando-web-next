import Link from 'next/link';

import { getSchoolsHttp } from '@/http';

import { cn } from '@/shared/libs';

import {
  buttonVariants,
  ContentWrapperHeaderComponent,
  ContentWrapperSectionComponent,
  NavigationBreadcrumbComponent,
  SchoolsTableComponent,
} from '@/components';

export default async function SchoolsAdminPage(): Promise<JSX.Element> {
  const schools = await getSchoolsHttp({ limit: 1000 });

  const breadcrumbItems = [
    {
      label: 'escolas',
      path: '',
    },
  ];

  return (
    <>
      <ContentWrapperHeaderComponent title="escolas">
        <NavigationBreadcrumbComponent
          className="m-0 mb-3 md:m-0 lg:m-0"
          breadcrumbItems={breadcrumbItems}
        />
        <Link
          className={cn(
            buttonVariants({ variant: 'admin', color: 'primary' }),
            'justify-self-end',
          )}
          href="/admin/schools/add"
        >
          Adicionar
        </Link>
      </ContentWrapperHeaderComponent>
      <ContentWrapperSectionComponent>
        {schools?.length ? (
          <SchoolsTableComponent schools={schools} />
        ) : (
          <p>Não há doadores disponíveis no momento.</p>
        )}
      </ContentWrapperSectionComponent>
    </>
  );
}
