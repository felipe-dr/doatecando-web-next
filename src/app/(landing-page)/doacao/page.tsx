import { getSchoolsHttp } from '@/http';

import {
  HeroComponent,
  HeroHeaderComponent,
  SchoolsComponent,
  SectionBoxComponent,
  TitleComponent,
} from '@/components';

export default async function DonationPage(): Promise<JSX.Element | undefined> {
  const schools = await getSchoolsHttp({ limit: 1000 });

  return (
    <>
      <HeroComponent>
        <HeroHeaderComponent>
          <TitleComponent
            className="animate-fadein text-base-white opacity-0 md:ms-8 lg:ms-11"
            tag="h1"
          >
            Sua <span className="text-primary-2">doação</span> renova a{' '}
            <span className="text-primary-2">educação</span>
          </TitleComponent>
        </HeroHeaderComponent>
      </HeroComponent>
      <main>
        <SectionBoxComponent
          className="pb-0 lg:pb-0"
          hasContainer={false}
          tag="section"
        >
          <div className="container max-w-screen-xl">
            {schools?.length ? (
              <SchoolsComponent schools={schools} />
            ) : (
              <p>Não há escolas disponíveis no momento.</p>
            )}
          </div>
        </SectionBoxComponent>
      </main>
    </>
  );
}
