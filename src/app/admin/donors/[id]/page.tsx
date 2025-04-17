import { revalidatePath } from 'next/cache';

import { getDonorByIdHttp } from '@/http';

import {
  ContentWrapperHeaderComponent,
  ContentWrapperSectionComponent,
  DonorFormComponent,
  NavigationBreadcrumbComponent,
} from '@/components';

interface DonorEditAdminPageProps {
  params: { id: number };
}

export default async function DonorEditAdminPage({
  params: { id },
}: DonorEditAdminPageProps): Promise<JSX.Element> {
  revalidatePath(`/admin/donors/${id}`);

  const donor = await getDonorByIdHttp({ id });

  const breadcrumbItems = [
    {
      label: 'doadores',
      path: '/admin/donors',
    },
    {
      label: 'editar',
      path: '',
    },
  ];

  return (
    <>
      <ContentWrapperHeaderComponent title="doadores">
        <NavigationBreadcrumbComponent
          className="m-0 md:m-0 lg:m-0"
          breadcrumbItems={breadcrumbItems}
        />
      </ContentWrapperHeaderComponent>
      <ContentWrapperSectionComponent>
        {donor && <DonorFormComponent donor={donor} />}
      </ContentWrapperSectionComponent>
    </>
  );
}
