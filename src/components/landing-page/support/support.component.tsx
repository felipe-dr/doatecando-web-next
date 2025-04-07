import {
  ComputerDesktopIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { JSX } from 'react';

import { cn } from '@/shared/libs';

import {
  buttonVariants,
  SectionBoxComponent,
  TitleComponent,
} from '@/components/';

export function SupportComponent(): JSX.Element {
  return (
    <SectionBoxComponent
      id="apoie"
      className="bg-base-15"
      hasContainer={false}
      tag="section"
    >
      <div className="container max-w-screen-xl">
        <header>
          <TitleComponent className="mb-10" tag="h2" hasDotDecorator={false}>
            Apoie
          </TitleComponent>
        </header>
        <div className="flex flex-col gap-9 gap-x-16 lg:flex-row">
          <ul className="space-y-9">
            <li className="max-w-[42.5rem] space-y-1">
              <h3 className="font-semibold text-primary-1">
                Técnico de equipamentos eletrônicos
              </h3>
              <p>
                Você possui habilidades para reparar equipamentos eletrônicos de
                informática que estão <strong>totalmente</strong> ou{' '}
                <strong>parcialmente</strong> <strong>danificados</strong>?
              </p>
            </li>
            <li className="max-w-[42.5rem] space-y-1">
              <h3 className="font-semibold text-primary-1">
                Profissionais de TI
              </h3>
              <p>
                Você possui conhecimentos de <strong>informática</strong> ou já
                lecionou algum curso relacionado à área, tais como: informática
                básica, lógica de programas, entre outros?
              </p>
            </li>
          </ul>
          <aside className="mx-auto lg:mx-0">
            <ComputerDesktopIcon className="ml-10 h-16 text-primary-4" />
            <WrenchScrewdriverIcon className="-mt-13 h-[6.25rem] text-primary-1" />
          </aside>
        </div>
      </div>
      <footer className="mt-11 grid justify-center">
        <p className="mb-7 text-center text-primary-1 sm:max-w-[29.625rem]">
          Então junte-se à equipe e doe suas habilidades para construir a
          educação!
        </p>
        <Link
          className={cn(
            buttonVariants({ color: 'primary' }),
            'mb-13 justify-self-center lg:mb-14',
          )}
          href="/doacao"
        >
          Oferecer serviço
        </Link>
      </footer>
    </SectionBoxComponent>
  );
}
