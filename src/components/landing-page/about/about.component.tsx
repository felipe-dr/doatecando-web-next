import Image from 'next/image';
import { JSX } from 'react';

import { SectionBoxComponent } from '@/components/';

import digitalInclusionConnection from '../../../../public/digital-inclusion-connection.jpg';
import digitalInclusionPossibilities from '../../../../public/digital-inclusion-possibilities.jpg';

export function AboutComponent(): JSX.Element {
  return (
    <SectionBoxComponent
      id="sobre"
      className="gap-9 lg:flex-row lg:pt-0"
      tag="section"
    >
      <div className="relative z-[2] order-last before:absolute before:left-0 before:h-[12.5rem] before:w-full before:rounded-md before:bg-primary-3 lg:order-first lg:ml-[3rem] lg:mt-[-7.5rem] lg:flex lg:before:ml-[-0.75rem] lg:before:mt-[3.375rem]">
        <Image
          className="relative z-[3] h-full rounded-md object-cover shadow-md duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-70 lg:pr-[2.25rem]"
          src={digitalInclusionConnection}
          width={360}
          height={224}
          alt="Inclusão digital conexão"
          placeholder="blur"
        />
        <Image
          className="relative z-[4] mx-auto mt-[-5rem] rounded-md object-cover shadow-md duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-70 lg:mx-0 lg:ml-[-12.5rem] lg:mt-[5rem]"
          src={digitalInclusionPossibilities}
          width={225}
          height={225}
          alt="Inclusão digital possibilidades"
          placeholder="blur"
        />
      </div>
      <div className="max-w-[42.5rem] space-y-9 lg:mt-[4.25rem]">
        <p>
          A Doatecando é uma iniciativa que visa promover mais inclusão digital
          e sustentabilidade, pois acredita que a educação aliada com a
          tecnologia podem transformar vidas e construir novas soluções.
        </p>
        <p>
          Conectando a generosidade de indivíduos e organizações com a
          necessidade e escassez de recursos tecnológicos no ambiente escolar
          público. O resultado é a <strong>inclusão</strong>,{' '}
          <strong>inovação</strong> e<strong>sustentabilidade</strong>.
        </p>
      </div>
    </SectionBoxComponent>
  );
}
