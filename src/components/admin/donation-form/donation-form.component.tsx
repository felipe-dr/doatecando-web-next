/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createDonationAction } from '@/actions';

import { toast } from '@/data/hooks';

import {
  DonatedEquipmentConditionsEnum,
  DonatedResourcesEnum,
  DonorModel,
  SchoolModel,
} from '@/shared/models';

import {
  ButtonComponent,
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
} from '@/components';

import { donationSchema } from './donation-schema';

interface DonationFormComponentProps {
  donors: DonorModel[];
  schools: SchoolModel[];
}

const donatedEquipmentsCondition = Object.entries(
  DonatedEquipmentConditionsEnum,
).map(([value, label]) => ({
  value,
  label,
}));

const donatedResources = Object.entries(DonatedResourcesEnum).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

export function DonationFormComponent({
  donors,
  schools,
}: DonationFormComponentProps): JSX.Element {
  const router = useRouter();
  const donationsForm = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      item: '',
      name: '',
      condition: '',
      donorId: 0,
      schoolId: 0,
    },
  });

  const handleSubmit = async (
    donationSchemaData: z.infer<typeof donationSchema>,
  ): Promise<void> => {
    const formData = new FormData();

    Object.entries(donationSchemaData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    try {
      const response = await createDonationAction(formData);

      if (response.success) {
        toast({
          title: 'Sucesso!',
          description: response.message ?? 'Doação criada com sucesso.',
          variant: 'success',
        });

        router.push('/admin/donations');
      } else {
        toast({
          title: 'Erro!',
          description: response.message ?? `Não foi possível criar a doação.`,
          variant: 'destructive',
        });
      }
    } catch (error: unknown) {
      toast({
        title: 'Erro!',
        description: `Um erro inesperado ocorreu ao tentar criar a doação. Tente novamente mais tarde.`,
        variant: 'destructive',
      });
    }
  };

  return (
    <FormComponent {...donationsForm}>
      <form
        className="grid space-y-8"
        onSubmit={donationsForm.handleSubmit(handleSubmit)}
      >
        {donationsForm.getValues('id') && (
          <FormFieldComponent
            control={donationsForm.control}
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
          control={donationsForm.control}
          name="item"
          render={({ field }) => (
            <FormItemComponent>
              <FormLabelComponent>Tipo do item</FormLabelComponent>
              <SelectComponent
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControlComponent>
                  <SelectTriggerComponent
                    className={field.value === '' ? 'text-base-9' : ''}
                  >
                    <SelectValueComponent placeholder="Selecione o tipo do item" />
                  </SelectTriggerComponent>
                </FormControlComponent>
                <SelectContentComponent>
                  {donatedResources?.map((donatedResource) => (
                    <SelectItemComponent
                      key={donatedResource.label}
                      value={donatedResource.value}
                    >
                      {donatedResource.label}
                    </SelectItemComponent>
                  ))}
                </SelectContentComponent>
              </SelectComponent>
              <FormMessageComponent />
            </FormItemComponent>
          )}
        />
        <FormFieldComponent
          control={donationsForm.control}
          name="name"
          render={({ field }) => (
            <FormItemComponent>
              <FormLabelComponent>Nome</FormLabelComponent>
              <FormControlComponent>
                <InputComponent
                  placeholder="Digite o nome do equipamento"
                  maxLength={50}
                  {...field}
                />
              </FormControlComponent>
              <FormMessageComponent />
            </FormItemComponent>
          )}
        />
        <FormFieldComponent
          control={donationsForm.control}
          name="condition"
          render={({ field }) => (
            <FormItemComponent>
              <FormLabelComponent>Condição</FormLabelComponent>
              <SelectComponent
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControlComponent>
                  <SelectTriggerComponent
                    className={field.value === '' ? 'text-base-9' : ''}
                  >
                    <SelectValueComponent placeholder="Selecione a condição" />
                  </SelectTriggerComponent>
                </FormControlComponent>
                <SelectContentComponent>
                  {donatedEquipmentsCondition?.map(
                    (donatedEquipmentCondition) => (
                      <SelectItemComponent
                        key={donatedEquipmentCondition.label}
                        value={String(donatedEquipmentCondition.value)}
                      >
                        {donatedEquipmentCondition.label}
                      </SelectItemComponent>
                    ),
                  )}
                </SelectContentComponent>
              </SelectComponent>
              <FormMessageComponent />
            </FormItemComponent>
          )}
        />
        <FormFieldComponent
          control={donationsForm.control}
          name="donorId"
          render={({ field }) => (
            <FormItemComponent>
              <FormLabelComponent>Doador</FormLabelComponent>
              <SelectComponent onValueChange={field.onChange}>
                <FormControlComponent>
                  <SelectTriggerComponent
                    className={Number(field.value) === 0 ? 'text-base-9' : ''}
                  >
                    <SelectValueComponent placeholder="Selecione o doador" />
                  </SelectTriggerComponent>
                </FormControlComponent>
                <SelectContentComponent>
                  {donors?.map((donor) => (
                    <SelectItemComponent
                      key={donor.id}
                      value={String(donor.id)}
                    >
                      {donor.name}
                    </SelectItemComponent>
                  ))}
                </SelectContentComponent>
              </SelectComponent>
              <FormMessageComponent />
            </FormItemComponent>
          )}
        />
        <FormFieldComponent
          control={donationsForm.control}
          name="schoolId"
          render={({ field }) => (
            <FormItemComponent>
              <FormLabelComponent>Escola</FormLabelComponent>
              <SelectComponent onValueChange={field.onChange}>
                <FormControlComponent>
                  <SelectTriggerComponent
                    className={Number(field.value) === 0 ? 'text-base-9' : ''}
                  >
                    <SelectValueComponent placeholder="Selecione a escola" />
                  </SelectTriggerComponent>
                </FormControlComponent>
                <SelectContentComponent>
                  {schools?.map((school) => (
                    <SelectItemComponent
                      key={school.id}
                      value={String(school.id)}
                    >
                      {school.name}
                    </SelectItemComponent>
                  ))}
                </SelectContentComponent>
              </SelectComponent>
              <FormMessageComponent />
            </FormItemComponent>
          )}
        />
        <ButtonComponent
          className="w-full sm:w-max sm:justify-self-end"
          color="primary"
          type="submit"
        >
          Adicionar
        </ButtonComponent>
      </form>
    </FormComponent>
  );
}
