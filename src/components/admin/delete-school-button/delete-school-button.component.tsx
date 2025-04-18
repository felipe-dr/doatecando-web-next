/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { deleteSchoolAction } from '@/actions';

import { toast } from '@/data/hooks';

import { AlertDialogActionComponent } from '@/components';

interface DeleteSchoolButtonComponentProps {
  id: number;
}

export function DeleteSchoolButtonComponent({
  id,
}: DeleteSchoolButtonComponentProps): JSX.Element {
  const handleDeleteSchool = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id', String(id));
    console.log(formData);

    try {
      const response = await deleteSchoolAction(formData);
      console.log(response);
      if (response.success) {
        toast({
          title: 'Sucesso!',
          description: 'Escola removida com sucesso.',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Erro!',
          description: response.message ?? 'Não foi possível remover a escola.',
          variant: 'destructive',
        });
      }
    } catch (error: unknown) {
      toast({
        title: 'Erro!',
        description:
          'Um erro inesperado ocorreu ao tentar remover a escola. Tente novamente mais tarde.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleDeleteSchool}>
      <input type="hidden" name="id" value={id} />
      <AlertDialogActionComponent type="submit">
        Continuar
      </AlertDialogActionComponent>
    </form>
  );
}
