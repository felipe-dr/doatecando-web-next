import { revalidatePath } from 'next/cache';

import { getSchoolByIdHttp } from '@/http';

import {
  ContentWrapperHeaderComponent,
  ContentWrapperSectionComponent,
  NavigationBreadcrumbComponent,
  SchoolFormComponent,
} from '@/components';

interface SchoolEditAdminPageProps {
  params: { id: number };
}

export default async function SchoolEditAdminPage({
  params: { id },
}: SchoolEditAdminPageProps): Promise<JSX.Element> {
  revalidatePath(`/admin/schools/${id}`);

  const school = await getSchoolByIdHttp({ id });

  const breadcrumbItems = [
    {
      label: 'escolas',
      path: '/admin/schools',
    },
    {
      label: 'editar',
      path: '',
    },
  ];

  return (
    <>
      <ContentWrapperHeaderComponent title="escolas">
        <NavigationBreadcrumbComponent
          className="m-0 md:m-0 lg:m-0"
          breadcrumbItems={breadcrumbItems}
        />
      </ContentWrapperHeaderComponent>
      <ContentWrapperSectionComponent>
        {school && <SchoolFormComponent school={school} />}
      </ContentWrapperSectionComponent>
    </>
  );
}
