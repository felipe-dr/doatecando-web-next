import { getDonorsHttp, getSchoolsHttp } from '@/http';

import {
  ContentWrapperHeaderComponent,
  ContentWrapperSectionComponent,
  DonationFormComponent,
  NavigationBreadcrumbComponent,
} from '@/components';

export default async function DonationsAddAdminPage(): Promise<JSX.Element> {
  const donors = await getDonorsHttp({ limit: 1000 });
  const schools = await getSchoolsHttp({ limit: 1000 });

  const breadcrumbItems = [
    {
      label: 'doações',
      path: '/admin/donations',
    },
    {
      label: 'adicionar',
      path: '',
    },
  ];

  return (
    <>
      <ContentWrapperHeaderComponent title="doações">
        <NavigationBreadcrumbComponent
          className="m-0 md:m-0 lg:m-0"
          breadcrumbItems={breadcrumbItems}
        />
      </ContentWrapperHeaderComponent>
      <ContentWrapperSectionComponent>
        <DonationFormComponent donors={donors} schools={schools} />
      </ContentWrapperSectionComponent>
    </>
  );
}
