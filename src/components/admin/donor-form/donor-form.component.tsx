/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createDonorAction, updateDonorAction } from '@/actions';

import { toast } from '@/data/hooks';

import { DonorModel } from '@/shared/models';

import {
  ButtonComponent,
  FormComponent,
  FormControlComponent,
  FormFieldComponent,
  FormItemComponent,
  FormLabelComponent,
  FormMessageComponent,
  InputComponent,
  MaskedInputComponent,
} from '@/components';

import { donorSchema } from './donor-schema';

interface DonorFormComponentProps {
  donor?: DonorModel;
}

export function DonorFormComponent({
  donor,
}: DonorFormComponentProps): JSX.Element {
  const router = useRouter();
  const donorsForm = useForm<z.infer<typeof donorSchema>>({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      id: donor?.id || undefined,
      name: donor?.name || '',
      document: donor?.document || '',
      mobile: donor?.mobile || '',
      email: donor?.email || '',
      site: donor?.site || '',
    },
  });

  const handleSubmit = async (
    donorSchemaData: z.infer<typeof donorSchema>,
  ): Promise<void> => {
    const formData = new FormData();

    Object.entries(donorSchemaData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    try {
      const response = donor
        ? await updateDonorAction(formData)
        : await createDonorAction(formData);

      if (response.success) {
        toast({
          title: 'Sucesso!',
          description: `Doador ${donor ? 'editado' : 'criado'} com sucesso.`,
          variant: 'success',
        });

        router.push('/admin/donors');
      } else {
        toast({
          title: 'Erro!',
          description: `Não foi possível ${donor ? 'editar' : 'criar'} o doador.`,
          variant: 'destructive',
        });
      }
    } catch (error: unknown) {
      toast({
        title: 'Erro!',
        description: `Um erro inesperado ocorreu ao tentar ${donor ? 'editar' : 'criar'} o doador. Tente novamente mais tarde.`,
        variant: 'destructive',
      });
    }
  };

  return (
    <FormComponent {...donorsForm}>
      <form
        className="grid space-y-8"
        onSubmit={donorsForm.handleSubmit(handleSubmit)}
      >
        {donorsForm.getValues('id') && (
          <FormFieldComponent
            control={donorsForm.control}
            name="id"
            render={({ field }) => (
              <FormItemComponent hidden>
                <FormLabelComponent>Id</FormLabelComponent>
                <FormControlComponent>
                  <InputComponent placeholder="Id" {...field} />
                </FormControlComponent>
                <FormMessageComponent />
              </FormItemComponent>
            )}
          />
        )}
        <FormFieldComponent
          control={donorsForm.control}
          name="name"
          render={({ field }) => (
            <FormItemComponent>
              <FormLabelComponent>Nome</FormLabelComponent>
              <FormControlComponent>
                <InputComponent
                  placeholder="Digite o nome do doador"
                  maxLength={50}
                  {...field}
                />
              </FormControlComponent>
              <FormMessageComponent />
            </FormItemComponent>
          )}
        />
        <FormFieldComponent
          control={donorsForm.control}
          name="document"
          render={({ field }) => {
            const documentWithOnlyDigits =
              field.value?.replace(/\D/g, '') ?? '';
            const mask =
              documentWithOnlyDigits.length > 11
                ? '99.999.999/9999-99'
                : '999.999.999-99';

            return (
              <FormItemComponent>
                <FormLabelComponent>
                  Documento ( CPF ou CNPJ )
                </FormLabelComponent>
                <FormControlComponent>
                  <MaskedInputComponent
                    key={mask}
                    mask={mask}
                    placeholder="Digite o CPF ou CNPJ do doador"
                    {...field}
                  />
                </FormControlComponent>
                <FormMessageComponent />
              </FormItemComponent>
            );
          }}
        />
        <FormFieldComponent
          control={donorsForm.control}
          name="mobile"
          render={({ field }) => (
            <FormItemComponent>
              <FormLabelComponent>Celular</FormLabelComponent>
              <FormControlComponent>
                <MaskedInputComponent
                  mask="(99) 99999-9999"
                  placeholder="Digite o celular do doador"
                  {...field}
                />
              </FormControlComponent>
              <FormMessageComponent />
            </FormItemComponent>
          )}
        />
        <FormFieldComponent
          control={donorsForm.control}
          name="email"
          render={({ field }) => (
            <FormItemComponent>
              <FormLabelComponent>E-mail</FormLabelComponent>
              <FormControlComponent>
                <InputComponent
                  placeholder="Digite o e-mail do doador"
                  {...field}
                />
              </FormControlComponent>
              <FormMessageComponent />
            </FormItemComponent>
          )}
        />
        <FormFieldComponent
          control={donorsForm.control}
          name="site"
          render={({ field }) => (
            <FormItemComponent>
              <FormLabelComponent>Website</FormLabelComponent>
              <FormControlComponent>
                <InputComponent
                  placeholder="Digite a url do website do doador"
                  {...field}
                />
              </FormControlComponent>
              <FormMessageComponent />
            </FormItemComponent>
          )}
        />
        <ButtonComponent
          className="w-full sm:w-max sm:justify-self-end"
          color="primary"
          type="submit"
        >
          {donor ? 'Salvar' : 'Adicionar'}
        </ButtonComponent>
      </form>
    </FormComponent>
  );
}
