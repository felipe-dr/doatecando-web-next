import {
  CpuChipIcon,
  UserGroupIcon,
  WifiIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

import { getDonatedItemsHttp } from '@/http';

import { useCalculateDonationsStats } from '@/data/hooks';

import { cn } from '@/shared/libs';

import { SectionBoxComponent } from '@/components/shared/section-box/section-box.component';
import { SectionDecoratorComponent } from '@/components/shared/section-decorator/section-decorator.component';
import { buttonVariants } from '@/components/ui/button';

export async function DonationsStatsComponent(): Promise<
  JSX.Element | undefined
> {
  const donatedItems = await getDonatedItemsHttp({ limit: 1000 });

  const { benefitedStudents, reusableElectronics, totalSupporters } =
    useCalculateDonationsStats({ donatedItems: donatedItems || [] });

  if (totalSupporters) {
    return (
      <SectionBoxComponent
        className="relative grid gap-y-11 pt-0 lg:pt-0"
        tag="section"
        hasContainer={false}
      >
        <div className="bg-base-14">
          <ul className="container max-w-screen-xl md:grid md:grid-cols-3">
            <li className="flex flex-col items-center border border-base-13 bg-primary-4 p-13">
              <WifiIcon className="h-[1.75rem] text-primary-8" />
              <var className="text-h1-xs font-semibold not-italic text-base-white lg:text-h1-lg">
                {benefitedStudents}
              </var>
              <h4 className="relative mt-9 text-center text-md font-semibold text-base-white before:absolute before:-top-6 before:left-1/2 before:mx-auto before:h-1 before:w-full before:max-w-[3.875rem] before:-translate-x-1/2 before:bg-base-13 lg:text-xl">
                Estudantes beneficiados
              </h4>
            </li>
            <li className="flex flex-col items-center border border-base-13 bg-base-14 p-13">
              <CpuChipIcon className="h-[1.75rem] text-primary-3" />
              <var className="text-h1-xs font-semibold not-italic text-base-white lg:text-h1-lg">
                {reusableElectronics?.length}
              </var>
              <h4 className="relative mt-9 text-center text-md font-semibold text-base-white before:absolute before:-top-6 before:left-1/2 before:mx-auto before:h-1 before:w-full before:max-w-[3.875rem] before:-translate-x-1/2 before:bg-primary-3 lg:text-xl">
                Eletrônicos reutilizados
              </h4>
            </li>
            <li className="flex flex-col items-center border border-base-13 bg-primary-4 p-13">
              <UserGroupIcon className="h-[1.75rem] text-primary-8" />
              <var className="text-h1-xs font-semibold not-italic text-base-white lg:text-h1-lg">
                {totalSupporters}
              </var>
              <h4 className="relative mt-9 text-center text-md font-semibold text-base-white before:absolute before:-top-6 before:left-1/2 before:mx-auto before:h-1 before:w-full before:max-w-[3.875rem] before:-translate-x-1/2 before:bg-base-13 lg:text-xl">
                Apoiadores
              </h4>
            </li>
          </ul>
        </div>
        <Link
          className={cn(
            buttonVariants({ color: 'primary' }),
            'mb-13 justify-self-center lg:mb-14',
          )}
          href="/doacao"
        >
          Junte-se a causa
        </Link>
        <SectionDecoratorComponent className="absolute bottom-0 z-[2] fill-base-15" />
      </SectionBoxComponent>
    );
  }
}
