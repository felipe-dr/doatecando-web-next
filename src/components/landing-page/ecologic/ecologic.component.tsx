import Image from 'next/image';
import { JSX } from 'react';

import {
  ButtonComponent,
  SectionBoxComponent,
  TitleComponent,
} from '@/components/';

import sustentability from '../../../../public/sustentability.jpg';

export function EcologicComponent(): JSX.Element {
  return (
    <SectionBoxComponent
      className="pb-0 lg:pb-0"
      hasContainer={false}
      tag="section"
    >
      <div className="container max-w-screen-xl">
        <header>
          <TitleComponent
            className="mb-10 max-w-[30rem]"
            tag="h2"
            hasDotDecorator={false}
          >
            Criar, transformar e reusar
          </TitleComponent>
        </header>
        <div className="flex flex-col gap-9 lg:flex-row">
          <ul className="space-y-9">
            <li className="max-w-[42.5rem] space-y-1">
              <p>
                A reutilização de computadores e eletrônicos também é uma
                maneira de contribuir com a sustentabilidade, reduzindo o
                descarte de equipamentos e diminuindo a quantidade de lixo
                eletrônico.
              </p>
            </li>
            <li className="max-w-[42.5rem] space-y-1">
              <p>
                Segundo pesquisas aproximadamente 85,8% dos brasileiros possuem
                eletrônicos em desuso, sendo que poderiam ser reaproveitados e
                utilizados por estudantes que não possuem fácil acesso.
              </p>
            </li>
            <li className="mx-auto max-w-[42.5rem] space-y-1 text-center lg:mx-0 lg:text-start">
              <p className="mb-9 text-primary-1">
                Se você é uma empresa de reciclagem e deseja colaborar com o
                futuro da educação, entre em contato e doe equipamentos que
                podem ser utilizados.
              </p>
              <ButtonComponent color="primary">Colaborar</ButtonComponent>
            </li>
          </ul>
          <aside className="mx-auto lg:order-first lg:mx-0">
            <Image
              className="rounded-md object-cover shadow-md duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-70"
              src={sustentability}
              width={561}
              height={374}
              alt="Sustentabilidade ambiental"
              placeholder="blur"
            />
          </aside>
        </div>
      </div>
    </SectionBoxComponent>
  );
}
