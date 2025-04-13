'use client';

import {
  ArrowLeftEndOnRectangleIcon,
  GlobeAltIcon,
  HeartIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useToast } from '@/data/hooks';

import {
  SidebarComponent,
  SidebarContentComponent,
  SidebarFooterComponent,
  SidebarGroupComponent,
  SidebarGroupContentComponent,
  SidebarGroupLabelComponent,
  SidebarHeaderComponent,
  SidebarMenuButtonComponent,
  SidebarMenuComponent,
  SidebarMenuItemComponent,
} from '@/components';

const ADMIN_SIDEBAR_ITEMS = [
  {
    label: 'doações',
    path: '/admin/donations',
    icon: HeartIcon,
  },
];

export function SidebarRootComponent(): JSX.Element {
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
    });

    if (response.ok) {
      toast({
        title: 'Sucesso!',
        description: 'Sessão encerrada com sucesso.',
        variant: 'success',
      });

      router.push('/');
    }
  };

  return (
    <SidebarComponent>
      <SidebarHeaderComponent />
      <SidebarContentComponent>
        <SidebarMenuComponent>
          <SidebarMenuItemComponent className="capitalize">
            <SidebarMenuButtonComponent asChild>
              <Link href="/admin">
                <HomeIcon /> Início
              </Link>
            </SidebarMenuButtonComponent>
          </SidebarMenuItemComponent>
          <SidebarMenuItemComponent className="capitalize">
            <SidebarMenuButtonComponent asChild>
              <Link href="/">
                <GlobeAltIcon className="size-4" /> Landing Page
              </Link>
            </SidebarMenuButtonComponent>
          </SidebarMenuItemComponent>
        </SidebarMenuComponent>
        <SidebarGroupComponent>
          <SidebarGroupLabelComponent>Gestão</SidebarGroupLabelComponent>
          <SidebarGroupContentComponent>
            <SidebarMenuComponent>
              {ADMIN_SIDEBAR_ITEMS.map((item) => (
                <SidebarMenuItemComponent
                  className="capitalize"
                  key={item.label}
                >
                  <SidebarMenuButtonComponent asChild>
                    <Link href={item.path}>
                      <item.icon />
                      {item.label}
                    </Link>
                  </SidebarMenuButtonComponent>
                </SidebarMenuItemComponent>
              ))}
            </SidebarMenuComponent>
          </SidebarGroupContentComponent>
        </SidebarGroupComponent>
      </SidebarContentComponent>
      <SidebarFooterComponent className="flex-row justify-between px-2 text-sm">
        <button className="flex gap-2" type="button" onClick={handleLogout}>
          <ArrowLeftEndOnRectangleIcon className="size-5" />
          Sair
        </button>
      </SidebarFooterComponent>
    </SidebarComponent>
  );
}
