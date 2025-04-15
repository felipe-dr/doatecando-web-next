/* eslint-disable react-hooks/rules-of-hooks */
import { GlobeAltIcon } from '@heroicons/react/24/outline';

import { getDonatedItemsHttp } from '@/http';

import { useDonorRanking } from '@/data/hooks';

import { BadgesEnum, RankingModel } from '@/shared/models';

import {
  BadgeIcon,
  RankingTableComponent,
  SectionBoxComponent,
  TitleComponent,
} from '@/components/';

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
  const donatedItems = await getDonatedItemsHttp({ limit: 1000 });

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
          <ul
            className="mb-2 flex flex-col items-center gap-9 md:flex-row md:justify-center"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            {donorsRanking.slice(0, 3).map((donorRanking, index) => (
              <li
                className={`relative flex w-full max-w-[21.25rem] flex-col items-center rounded-md border border-primary-1 bg-primary-4 text-center ${index === 0 && 'border-primary-3 bg-primary-8'} ${index === 1 && 'md:-order-1'} ${index === 2 && '!border-primary-7 !bg-primary-1'}`}
                key={donorRanking.id}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Person"
              >
                <meta itemProp="position" content={setRankingPosition(index)} />
                <span className="self-start ps-[0.75rem] text-h2-md text-base-white">
                  {setRankingPosition(index)}
                </span>
                {donorRanking.site && (
                  <a
                    href={`https://${donorRanking.site}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    itemProp="url"
                  >
                    <GlobeAltIcon className="absolute right-2 top-2 mx-auto size-4 text-base-2" />
                  </a>
                )}
                <BadgeIcon className="absolute left-1/2 top-[-1.5rem] h-[4.938rem] -translate-x-1/2" />
                <header className="mb-8 mt-2 grow-[2] px-6 font-semibold uppercase">
                  <address
                    className={`text-h3-md not-italic text-base-white ${index === 0 && 'text-primary-1'} ${index === 2 && 'text-primary-7'}`}
                  >
                    {donorRanking.site ? (
                      <a
                        href={`https://${donorRanking.site}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        itemProp="name"
                      >
                        {donorRanking.name}
                      </a>
                    ) : (
                      donorRanking.site
                    )}
                  </address>
                  <ul className="mt-2 flex justify-center gap-1">
                    {donorRanking.badges?.map((badge) => (
                      <li className="text-sm" key={badge}>
                        {Array.from(BadgesEnum[badge])[0] as string}
                      </li>
                    ))}
                  </ul>
                </header>
                <footer
                  className={`px-6 pb-6 text-md text-base-3 ${index === 2 && 'text-primary-8'}`}
                  itemProp="interactionStatistic"
                  itemScope
                  itemType="https://schema.org/InteractionCounter"
                >
                  <meta
                    itemProp="interactionType"
                    content="https://schema.org/DonateAction"
                  />
                  <meta
                    itemProp="userInteractionCount"
                    content={String(donorRanking.totalItemsDonated)}
                  />
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
