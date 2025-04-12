'use client';

import {
  ButtonComponent,
  DialogComponent,
  DialogContentComponent,
  DialogHeaderComponent,
  DialogTitleComponent,
  DialogTriggerComponent,
  SigninDialogComponent,
  SignupDialogComponent,
  TabsComponent,
  TabsContentComponent,
  TabsListComponent,
  TabsTriggerComponent,
  TitleComponent,
} from '@/components';

export function AuthDialogComponent(): JSX.Element {
  return (
    <>
      {/* <DialogComponent onOpenChange={handleClose}> */}
      <DialogComponent>
        <DialogTriggerComponent asChild>
          <ButtonComponent color="primary" className="w-full">
            Entrar
          </ButtonComponent>
        </DialogTriggerComponent>
        <DialogContentComponent className="sm:max-w-screen-sm">
          <TabsComponent defaultValue="auth">
            <TabsListComponent className="flex-wrap w-full mt-7 mb-5">
              <TabsTriggerComponent className="w-full flex-1" value="auth">
                Autenticar
              </TabsTriggerComponent>
              <TabsTriggerComponent className="w-full flex-1" value="register">
                Registrar
              </TabsTriggerComponent>
            </TabsListComponent>
            <TabsContentComponent value="auth">
              <DialogHeaderComponent>
                <DialogTitleComponent asChild>
                  <TitleComponent tag="h3" hasDotDecorator={false}>
                    Autenticar
                  </TitleComponent>
                </DialogTitleComponent>
              </DialogHeaderComponent>
              <SigninDialogComponent />
            </TabsContentComponent>
            <TabsContentComponent value="register">
              <DialogHeaderComponent>
                <DialogTitleComponent asChild>
                  <TitleComponent tag="h3" hasDotDecorator={false}>
                    Registrar
                  </TitleComponent>
                </DialogTitleComponent>
              </DialogHeaderComponent>
              <SignupDialogComponent />
            </TabsContentComponent>
          </TabsComponent>
        </DialogContentComponent>
      </DialogComponent>
    </>
  );
}
