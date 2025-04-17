import {
  ContentWrapperHeaderComponent,
  ContentWrapperSectionComponent,
  DonorFormComponent,
  NavigationBreadcrumbComponent,
} from '@/components';

export default async function DonorsAddAdminPage(): Promise<JSX.Element> {
  const breadcrumbItems = [
    {
      label: 'doadores',
      path: '/admin/donors',
    },
    {
      label: 'adicionar',
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
        <DonorFormComponent />
      </ContentWrapperSectionComponent>
    </>
  );
}
