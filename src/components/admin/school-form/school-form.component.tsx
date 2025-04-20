/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createSchoolAction, updateSchoolAction } from '@/actions';

import { toast } from '@/data/hooks';

import { SchoolModel, UrgencyEnum } from '@/shared/models';

import {
  ButtonComponent,
  CheckboxComponent,
  FormComponent,
  FormControlComponent,
  FormDescriptionComponent,
  FormFieldComponent,
  FormItemComponent,
  FormLabelComponent,
  FormMessageComponent,
  InputComponent,
  MaskedInputComponent,
  SelectComponent,
  SelectContentComponent,
  SelectItemComponent,
  SelectTriggerComponent,
  SelectValueComponent,
  signupDialogSchema,
  SwitchComponent,
} from '@/components';

interface SchoolFormComponentProps {
  school?: SchoolModel;
}

const urgencyLevels = Object.entries(UrgencyEnum).map(([value, label]) => ({
  value,
  label,
}));

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

export function SchoolFormComponent({
  school,
}: SchoolFormComponentProps): JSX.Element {
  const router = useRouter();
  const schoolsForm = useForm<z.infer<typeof signupDialogSchema>>({
    resolver: zodResolver(signupDialogSchema),
    defaultValues: {
      id: school?.id || undefined,
      name: school?.name || '',
      street: school?.street || '',
      number: school?.number || '',
      postalCode: school?.postalCode || '',
      latitude: school?.latitude || 0,
      longitude: school?.longitude || 0,
      neighbourhood: school?.neighbourhood || '',
      unprivilegedArea: school?.unprivilegedArea ?? false,
      urgency: school?.urgency || '',
      quantityOfStudents: school?.quantityOfStudents || 0,
      availability: school?.availability || '',
      phone: school?.phone || '',
      email: school?.email || '',
      password: school?.password || '',
    },
  });
  const [startTime, setStartTime] = useState<string>('00:00');
  const [endTime, setEndTime] = useState<string>('00:00');

  useEffect(() => {
    if (!school) return;

    if (school.availability) {
      const [daysPart, timePart] = school.availability.split(' ');

      if (daysPart) {
        schoolsForm.setValue('availability', daysPart);
      }

      if (timePart) {
        const [start, end] = timePart.split('-');
        setStartTime(start || '00:00');
        setEndTime(end || '00:00');
      }
    }
  }, [school, schoolsForm]);

  const handleDayChange = (day: string, isChecked: boolean) => {
    const currentAvailability = schoolsForm
      .getValues('availability')
      .split('-');

    let updatedAvailability: string[];

    if (isChecked) {
      if (!currentAvailability.includes(day)) {
        updatedAvailability = [...currentAvailability, day];
      } else {
        updatedAvailability = [...currentAvailability];
      }
    } else {
      updatedAvailability = currentAvailability.filter((d) => d !== day);
    }

    const sortedAvailability = updatedAvailability.sort((a, b) => {
      const order = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
      return order.indexOf(a) - order.indexOf(b);
    });

    schoolsForm.setValue('availability', sortedAvailability.join('-'));

    const formattedAvailability = schoolsForm.getValues('availability');

    if (formattedAvailability.startsWith('-')) {
      schoolsForm.setValue('availability', formattedAvailability.slice(1));
    }
  };

  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  const handleSubmit = async (
    schoolSchemaData: z.infer<typeof signupDialogSchema>,
  ): Promise<void> => {
    const formData = new FormData();
    let availability = schoolsForm.getValues('availability');
    const latitude = schoolsForm.getValues('latitude');
    const longitude = schoolsForm.getValues('longitude');

    if (startTime && endTime) {
      availability += ` ${startTime}-${endTime}`;
    }

    if (latitude === undefined) {
      schoolSchemaData.latitude = 0;
    }

    if (longitude === undefined) {
      schoolSchemaData.longitude = 0;
    }

    formData.delete('availability');
    formData.append('availability', availability);
    schoolSchemaData.availability = availability;

    Object.entries(schoolSchemaData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    try {
      const response = school
        ? await updateSchoolAction(formData)
        : await createSchoolAction(formData);

      if (response.success) {
        toast({
          title: 'Sucesso!',
          description: `Escola ${school ? 'editada' : 'criada'} com sucesso.`,
          variant: 'success',
        });

        router.push('/admin/schools');
      } else {
        toast({
          title: 'Erro!',
          description: `Não foi possível ${school ? 'editar' : 'criar'} a escola.`,
          variant: 'destructive',
        });
      }
    } catch (error: unknown) {
      toast({
        title: 'Erro!',
        description: `Um erro inesperado ocorreu ao tentar ${school ? 'editar' : 'criar'} a escola. Tente novamente mais tarde.`,
        variant: 'destructive',
      });
    }
  };

  return (
    <FormComponent {...schoolsForm}>
      <form
        className="grid space-y-8"
        noValidate
        onSubmit={schoolsForm.handleSubmit(handleSubmit)}
      >
        <div className="space-y-8">
          <FormFieldComponent
            control={schoolsForm.control}
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
            control={schoolsForm.control}
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
            control={schoolsForm.control}
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
            control={schoolsForm.control}
            name="postalCode"
            render={({ field }) => (
              <FormItemComponent className="px-1">
                <FormLabelComponent>CEP</FormLabelComponent>
                <FormControlComponent>
                  <MaskedInputComponent
                    mask="99999-999"
                    placeholder="Digite o CEP da escola"
                    {...field}
                  />
                </FormControlComponent>
                <FormMessageComponent />
              </FormItemComponent>
            )}
          />
          <FormFieldComponent
            control={schoolsForm.control}
            name="latitude"
            render={({ field }) => (
              <FormItemComponent className="px-1">
                <FormLabelComponent>Latitude</FormLabelComponent>
                <FormControlComponent>
                  <InputComponent
                    placeholder="Digite a latitude de localização da escola: -23.5313425"
                    {...field}
                  />
                </FormControlComponent>
                <FormDescriptionComponent>
                  <span className="font-semibold text-primary-2">DICA:</span>{' '}
                  informe o CEP na url conforme exemplo para obter a latitude:{' '}
                  <a
                    className="font-semibold text-primary-3"
                    href="https://brasilapi.com.br/api/cep/v2/01153000"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://brasilapi.com.br/api/cep/v2/
                    <span className="text-primary-1">01153000</span>
                  </a>
                </FormDescriptionComponent>
                <FormMessageComponent />
              </FormItemComponent>
            )}
          />
          <FormFieldComponent
            control={schoolsForm.control}
            name="longitude"
            render={({ field }) => (
              <FormItemComponent className="px-1">
                <FormLabelComponent>Longitude</FormLabelComponent>
                <FormControlComponent>
                  <InputComponent
                    placeholder="Digite a longitude de localização da escola: -23.5313425"
                    {...field}
                  />
                </FormControlComponent>
                <FormDescriptionComponent>
                  <span className="font-semibold text-primary-2">DICA:</span>{' '}
                  informe o CEP na url conforme exemplo para obter a longitude:{' '}
                  <a
                    className="font-semibold text-primary-3"
                    href="https://brasilapi.com.br/api/cep/v2/01153000"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://brasilapi.com.br/api/cep/v2/
                    <span className="text-primary-1">01153000</span>
                  </a>
                </FormDescriptionComponent>
                <FormMessageComponent />
              </FormItemComponent>
            )}
          />
          <FormFieldComponent
            control={schoolsForm.control}
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
            control={schoolsForm.control}
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
            control={schoolsForm.control}
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
            control={schoolsForm.control}
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
            control={schoolsForm.control}
            name="availability"
            render={({ field }) => (
              <FormItemComponent className="px-1">
                <FormLabelComponent>Disponibilidade</FormLabelComponent>
                <FormControlComponent>
                  <div className="flex flex-wrap gap-4">
                    {daysOfWeek.map((day, index) => (
                      <div key={index} className="flex items-center">
                        <CheckboxComponent
                          checked={field.value.split('-').includes(day)}
                          onCheckedChange={(checked) =>
                            handleDayChange(day, checked as boolean)
                          }
                        />
                        <label htmlFor={day} className="ml-2">
                          {day}
                        </label>
                      </div>
                    ))}
                  </div>
                </FormControlComponent>
                <div className="mt-4 flex flex-wrap gap-3">
                  <InputComponent
                    className="w-1/4"
                    type="time"
                    placeholder="Informe a hora de início"
                    value={startTime}
                    onChange={handleStartTimeChange}
                  />
                  <InputComponent
                    className="w-1/4"
                    type="time"
                    placeholder="Informe a hora de fim"
                    value={endTime}
                    onChange={handleEndTimeChange}
                  />
                </div>
                <FormMessageComponent />
              </FormItemComponent>
            )}
          />
          <FormFieldComponent
            control={schoolsForm.control}
            name="phone"
            render={({ field }) => (
              <FormItemComponent className="px-1">
                <FormLabelComponent>Telefone</FormLabelComponent>
                <FormControlComponent>
                  <MaskedInputComponent
                    mask="(99) 9999-9999"
                    placeholder="Digite o telefone para contato da escola"
                    {...field}
                  />
                </FormControlComponent>
                <FormMessageComponent />
              </FormItemComponent>
            )}
          />
          <FormFieldComponent
            control={schoolsForm.control}
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
          {!school && (
            <FormFieldComponent
              control={schoolsForm.control}
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
          )}
        </div>
        <ButtonComponent
          className="w-full sm:w-max sm:justify-self-end"
          color="primary"
          type="submit"
        >
          {school ? 'Salvar' : 'Adicionar'}
        </ButtonComponent>
      </form>
    </FormComponent>
  );
}
