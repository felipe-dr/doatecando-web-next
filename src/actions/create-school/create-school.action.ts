'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { createSchoolHttp } from '@/http';

import { signupDialogSchema } from '@/components';

export async function createSchoolAction(formData: FormData) {
  const formDataObject = Object.fromEntries(formData.entries());
  delete formDataObject.id;
  const schoolSchemaValidation = signupDialogSchema.safeParse(formDataObject);
  const school = schoolSchemaValidation.data!;

  if (!schoolSchemaValidation.success) {
    const errors = schoolSchemaValidation.error.flatten().fieldErrors;

    return { success: false, message: 'Erro na validação de dados', errors };
  }

  delete school.id;

  try {
    const accessToken = cookies().get('accessToken')?.value;

    if (!accessToken) {
      return {
        message: 'Um erro inesperado ocorreu!',
      };
    }

    const response = await createSchoolHttp({
      accessToken,
      school,
    });

    if (response?.error) {
      return { success: false, message: response?.error };
    }

    revalidatePath('/admin/donors');
    revalidatePath('/admin/donors/add');
    revalidatePath('/admin/donations');
    revalidatePath('/admin/donations/add');
    revalidatePath('/admin/schools');
    revalidatePath('/');

    return { success: true, message: 'sucesso' };
  } catch (error) {
    return { success: false, message: null, error };
  }
}
