'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signupHttp } from '@/http';

import { useToast } from '@/data/hooks';

import { UrgencyEnum } from '@/shared/models';

import {
  ButtonComponent,
  DialogFooterComponent,
  FormComponent,
  FormControlComponent,
  FormFieldComponent,
  FormItemComponent,
  FormLabelComponent,
  FormMessageComponent,
  InputComponent,
  SelectComponent,
  SelectContentComponent,
  SelectItemComponent,
  SelectTriggerComponent,
  SelectValueComponent,
  SpinnerComponent,
  SwitchComponent,
} from '@/components';

import { signupDialogSchema } from './signup-dialog.schema';

const urgencyLevels = Object.entries(UrgencyEnum).map(([value, label]) => ({
  value,
  label,
}));

export function SignupDialogComponent(): JSX.Element {
  const signupDialogForm = useForm<z.infer<typeof signupDialogSchema>>({
    resolver: zodResolver(signupDialogSchema),
    defaultValues: {
      name: '',
      street: '',
      number: '',
      postalCode: '',
      neighbourhood: '',
      unprivilegedArea: false,
      urgency: '',
      quantityOfStudents: 0,
      availability: '',
      phone: '',
      email: '',
      password: '',
    },
  });
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: signupHttp,
    onSuccess: (data) => {
      if (data) {
        router.push('/');

        toast({
          title: 'Sucesso!',
          description: 'Registro efetuado com sucesso.',
          variant: 'success',
        });
      }
    },
  });

  function handleSubmit(values: z.infer<typeof signupDialogSchema>): void {
    mutate({ values });
  }

  function handleClose(): void {
    signupDialogForm.reset({
      name: '',
      street: '',
      number: '',
      postalCode: '',
      neighbourhood: '',
      unprivilegedArea: false,
      urgency: '',
      quantityOfStudents: 0,
      availability: '',
      phone: '',
      email: '',
      password: '',
    });
  }

  useEffect(() => {
    if (error?.message) {
      toast({
        title: 'Erro!',
        description: 'Um erro inesperado ocorreu. Tente novamente mais tarde.',
        variant: 'destructive',
      });
    }
  }, [isError, error, toast]);

  return (
    <>
      <FormComponent {...signupDialogForm}>
        <form noValidate onSubmit={signupDialogForm.handleSubmit(handleSubmit)}>
          <div className="max-h-[600px] space-y-8 overflow-y-scroll">
            <FormFieldComponent
              control={signupDialogForm.control}
              name="name"
              render={({ field }) => (
                <FormItemComponent className="px-1">
                  <FormLabelComponent>Nome</FormLabelComponent>
                  <FormControlComponent>
                    <InputComponent
                      placeholder="Digite o nome da escola"
                      {...field}
                    />
                  </FormControlComponent>
                  <FormMessageComponent />
                </FormItemComponent>
              )}
            />
            <FormFieldComponent
              control={signupDialogForm.control}
              name="street"
              render={({ field }) => (
                <FormItemComponent className="px-1">
                  <FormLabelComponent>Rua</FormLabelComponent>
                  <FormControlComponent>
                    <InputComponent
                      placeholder="Digite a rua da escola"
                      {...field}
                    />
                  </FormControlComponent>
                  <FormMessageComponent />
                </FormItemComponent>
              )}
            />
            <FormFieldComponent
              control={signupDialogForm.control}
              name="number"
              render={({ field }) => (
                <FormItemComponent className="px-1">
                  <FormLabelComponent>Número</FormLabelComponent>
                  <FormControlComponent>
                    <InputComponent
                      placeholder="Digite o número da escola"
                      {...field}
                    />
                  </FormControlComponent>
                  <FormMessageComponent />
                </FormItemComponent>
              )}
            />
            <FormFieldComponent
              control={signupDialogForm.control}
              name="postalCode"
              render={({ field }) => (
                <FormItemComponent className="px-1">
                  <FormLabelComponent>CEP</FormLabelComponent>
                  <FormControlComponent>
                    <InputComponent
                      maxLength={8}
                      placeholder="Digite o CEP da escola"
                      {...field}
                    />
                  </FormControlComponent>
                  <FormMessageComponent />
                </FormItemComponent>
              )}
            />
            <FormFieldComponent
              control={signupDialogForm.control}
              name="neighbourhood"
              render={({ field }) => (
                <FormItemComponent className="px-1">
                  <FormLabelComponent>Bairro</FormLabelComponent>
                  <FormControlComponent>
                    <InputComponent
                      placeholder="Digite o bairro da escola"
                      {...field}
                    />
                  </FormControlComponent>
                  <FormMessageComponent />
                </FormItemComponent>
              )}
            />
            <FormFieldComponent
              control={signupDialogForm.control}
              name="unprivilegedArea"
              render={({ field }) => (
                <FormItemComponent className="flex items-center gap-2 px-1">
                  <FormLabelComponent>Área carente?</FormLabelComponent>
                  <FormControlComponent>
                    <SwitchComponent
                      className="!my-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControlComponent>
                  <FormMessageComponent />
                </FormItemComponent>
              )}
            />
            <FormFieldComponent
              control={signupDialogForm.control}
              name="urgency"
              render={({ field }) => (
                <FormItemComponent className="px-1">
                  <FormLabelComponent>Urgência</FormLabelComponent>
                  <SelectComponent
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControlComponent>
                      <SelectTriggerComponent
                        className={field.value === '' ? 'text-base-9' : ''}
                      >
                        <SelectValueComponent placeholder="Selecione a urgência" />
                      </SelectTriggerComponent>
                    </FormControlComponent>
                    <SelectContentComponent>
                      {urgencyLevels?.map((urgencyLevel) => (
                        <SelectItemComponent
                          key={urgencyLevel.label}
                          value={urgencyLevel.value}
                        >
                          {urgencyLevel.label}
                        </SelectItemComponent>
                      ))}
                    </SelectContentComponent>
                  </SelectComponent>
                  <FormMessageComponent />
                </FormItemComponent>
              )}
            />
            <FormFieldComponent
              control={signupDialogForm.control}
              name="quantityOfStudents"
              render={({ field }) => (
                <FormItemComponent className="px-1">
                  <FormLabelComponent>
                    Quantidade de estudantes
                  </FormLabelComponent>
                  <FormControlComponent>
                    <InputComponent
                      type="number"
                      min={1}
                      placeholder="Digite a quantidade de estudantes"
                      {...field}
                    />
                  </FormControlComponent>
                  <FormMessageComponent />
                </FormItemComponent>
              )}
            />
            <FormFieldComponent
              control={signupDialogForm.control}
              name="availability"
              render={({ field }) => (
                <FormItemComponent className="px-1">
                  <FormLabelComponent>Disponibilidade</FormLabelComponent>
                  <FormControlComponent>
                    <InputComponent
                      placeholder="Digite a disponibilidade da escola"
                      {...field}
                    />
                  </FormControlComponent>
                  <FormMessageComponent />
                </FormItemComponent>
              )}
            />
            <FormFieldComponent
              control={signupDialogForm.control}
              name="phone"
              render={({ field }) => (
                <FormItemComponent className="px-1">
                  <FormLabelComponent>Contato</FormLabelComponent>
                  <FormControlComponent>
                    <InputComponent
                      placeholder="Digite o telefone para contato da escola"
                      {...field}
                    />
                  </FormControlComponent>
                  <FormMessageComponent />
                </FormItemComponent>
              )}
            />
            <FormFieldComponent
              control={signupDialogForm.control}
              name="email"
              render={({ field }) => (
                <FormItemComponent className="px-1">
                  <FormLabelComponent>E-mail</FormLabelComponent>
                  <FormControlComponent>
                    <InputComponent placeholder="Digite o e-mail" {...field} />
                  </FormControlComponent>
                  <FormMessageComponent />
                </FormItemComponent>
              )}
            />
            <FormFieldComponent
              control={signupDialogForm.control}
              name="password"
              render={({ field }) => (
                <FormItemComponent className="px-1">
                  <FormLabelComponent>Senha</FormLabelComponent>
                  <FormControlComponent>
                    <InputComponent
                      type="password"
                      placeholder="Digite a sua senha"
                      {...field}
                    />
                  </FormControlComponent>
                  <FormMessageComponent />
                </FormItemComponent>
              )}
            />
          </div>
          <DialogFooterComponent className="mt-8">
            <ButtonComponent color="primary" type="submit" disabled={isPending}>
              Registrar
            </ButtonComponent>
          </DialogFooterComponent>
        </form>
      </FormComponent>

      {isPending && (
        <div className="fixed inset-0 z-[100] flex h-screen w-full items-center justify-center bg-base-black/40">
          <SpinnerComponent />
        </div>
      )}
    </>
  );
}
