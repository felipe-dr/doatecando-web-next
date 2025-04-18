import {
  ContentWrapperHeaderComponent,
  ContentWrapperSectionComponent,
  NavigationBreadcrumbComponent,
  SchoolFormComponent,
} from '@/components';

export default async function SchoolsAddAdminPage(): Promise<JSX.Element> {
  const breadcrumbItems = [
    {
      label: 'escolas',
      path: '/admin/schools',
    },
    {
      label: 'adicionar',
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
        <SchoolFormComponent />
      </ContentWrapperSectionComponent>
    </>
  );
}
