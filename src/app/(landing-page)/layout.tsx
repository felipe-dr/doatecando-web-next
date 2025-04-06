import type { Metadata } from 'next';
import { JSX } from 'react';

import {
  ButtonSigninOrEnterAdminComponent,
  FooterComponent,
  HeaderComponent,
} from '@/components';

export const metadata: Metadata = {
  title: 'Doatecando - Doação que Educa, Atitude que Preserva',
  description:
    'A Doatecando é uma iniciativa que visa promover mais inclusão digital e sustentabilidade, pois acredita que a educação aliada com a tecnologia podem transformar vidas e construir novas soluções.',
};

export default async function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<JSX.Element> {
  const buttonSigninOrEnterAdminComponent =
    await ButtonSigninOrEnterAdminComponent();

  return (
    <>
      <HeaderComponent
        buttonSigninOrEnterAdminComponent={buttonSigninOrEnterAdminComponent}
      />
      {children}
      <FooterComponent />
    </>
  );
}
