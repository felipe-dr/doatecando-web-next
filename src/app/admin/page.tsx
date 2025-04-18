import {
  AcademicCapIcon,
  HeartIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

import {
  ContentWrapperHeaderComponent,
  ContentWrapperSectionComponent,
} from '@/components';

export default function AdminPage(): JSX.Element {
  return (
    <>
      <ContentWrapperHeaderComponent title="Olá, seja bem vindo!"></ContentWrapperHeaderComponent>
      <ContentWrapperSectionComponent>
        <ul className="grid items-center gap-3">
          <li>
            <Link
              className="flex items-center gap-2 rounded-lg border border-base-14 bg-base-15 p-7 font-semibold text-base-white transition-colors hover:border-primary-3"
              href="/admin/donations"
            >
              <HeartIcon className="size-6 text-primary-2" />
              Doações
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-2 rounded-lg border border-base-14 bg-base-15 p-7 font-semibold text-base-white transition-colors hover:border-primary-3"
              href="/admin/donors"
            >
              <UserGroupIcon className="size-6 text-primary-2" />
              Doadores
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-2 rounded-lg border border-base-14 bg-base-15 p-7 font-semibold text-base-white transition-colors hover:border-primary-3"
              href="/admin/schools"
            >
              <AcademicCapIcon className="size-6 text-primary-2" />
              Escolas
            </Link>
          </li>
        </ul>
      </ContentWrapperSectionComponent>
    </>
  );
}
