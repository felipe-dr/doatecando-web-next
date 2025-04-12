import {
  BadgeIcon,
  RankingTableComponent,
  SectionBoxComponent,
  TitleComponent,
} from '@/components/';
import { useDonorRanking } from '@/data/hooks';

import { getDonatedItemsHttp } from '@/http';

import { BadgesType, RankingModel } from '@/shared/models';

function setRankingPosition(position: number): string | undefined {
  switch (position + 1) {
    case 1:
      return '1º';
    case 2:
      return '2º';
    case 3:
      return '3º';
  }
}

export async function RankingComponent(): Promise<JSX.Element | undefined> {
  const donatedItems = await getDonatedItemsHttp({ limit: 100 });

  if (donatedItems) {
    const { donorsRanking } = useDonorRanking({ donatedItems });
    let ranking: RankingModel[] = [];

    if (donorsRanking) {
      ranking = donorsRanking.map((donorRanking, index) => {
        return {
          position: String(++index),
          donor: donorRanking.name!,
          quantity: donorRanking.totalItemsDonated!,
          badges: donorRanking.badges!,
          site: donorRanking.site,
        };
      });
    }

    return (
      <SectionBoxComponent
        className="bg-base-15"
        id="ranking"
        hasContainer={false}
        tag="section"
      >
        <div className="container max-w-screen-xl">
          <header>
            <TitleComponent
              className="mb-10 max-w-[41.875rem]"
              tag="h2"
              hasDotDecorator={false}
            >
              Ranking de doadores
            </TitleComponent>
          </header>
          <ul className="items-center flex flex-col gap-9 md:flex-row md:justify-center">
            {donorsRanking.map((donorRanking, index) => (
              <li
                className={`w-full relative flex max-w-[21.25rem] flex-col items-center rounded-md border border-primary-1 bg-primary-4 text-center ${index === 0 && 'bg-primary-8 border-primary-3'} ${index === 1 && 'md:-order-1'} ${index === 2 && 'bg-primary-1 border-primary-7'}`}
                key={donorRanking.id}
              >
                <span className="self-start ps-[0.75rem] text-h2-md text-base-white">
                  {setRankingPosition(index)}
                </span>
                <BadgeIcon className="absolute left-1/2 top-[-1.5rem] h-[4.938rem] -translate-x-1/2" />
                <header className="flex-grow-[2] mb-8 mt-2 px-6 font-semibold uppercase">
                  <address
                    className={`text-h3-md not-italic text-base-white ${index === 0 && 'text-primary-1'} ${index === 2 && 'text-primary-7'}`}
                  >
                    {donorRanking.name}
                  </address>
                  <ul className="flex justify-center gap-1 mt-2">
                    {donorRanking.badges?.map((badge) => (
                      <li className="text-sm" key={badge}>
                        {Array.from(BadgesType[badge])[0] as string}
                      </li>
                    ))}
                  </ul>
                </header>
                <footer
                  className={`px-6 pb-6 text-md text-base-3 ${index === 2 && 'text-primary-8'}`}
                >
                  <var className="not-italic">
                    {donorRanking.totalItemsDonated}
                  </var>{' '}
                  {donorRanking.totalItemsDonated === 1 ? 'doação' : 'doações'}
                </footer>
              </li>
            ))}
          </ul>
          <RankingTableComponent ranking={ranking} />
        </div>
      </SectionBoxComponent>
    );
  }
}
