import {
  AboutComponent,
  EcologicComponent,
  HeroComponent,
  HeroHeaderComponent,
  RankingComponent,
  DonationsStatsComponent,
  SupportComponent,
  TitleComponent,
} from '@/components';

export default function LandingPage(): JSX.Element {
  return (
    <>
      <HeroComponent>
        <HeroHeaderComponent>
          <TitleComponent
            className="animate-fadein text-base-white opacity-0 md:ms-8 lg:ms-11"
            tag="h1"
          >
            <span className="text-primary-2">Doação</span> que educa, atitude
            que <span className="text-primary-2">preserva</span>
          </TitleComponent>
        </HeroHeaderComponent>
      </HeroComponent>
      <main>
        <AboutComponent />
        <RankingComponent />
        <DonationsStatsComponent />
        <SupportComponent />
        <EcologicComponent />
      </main>
    </>
  );
}
