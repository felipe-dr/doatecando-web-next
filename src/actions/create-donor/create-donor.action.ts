'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { createDonorHttp } from '@/http';

import { donorSchema } from '@/components';

export async function createDonorAction(formData: FormData) {
  const formDataObject = Object.fromEntries(formData.entries());
  delete formDataObject.id;
  const donorSchemaValidation = donorSchema.safeParse(formDataObject);
  const donor = donorSchemaValidation.data!;

  if (!donorSchemaValidation.success) {
    const errors = donorSchemaValidation.error.flatten().fieldErrors;

    return { success: false, message: 'Erro na validação de dados', errors };
  }

  delete donor.id;

  try {
    const accessToken = cookies().get('accessToken')?.value;

    if (!accessToken) {
      return {
        message: 'Um erro inesperado ocorreu!',
      };
    }

    const response = await createDonorHttp({
      accessToken,
      donor,
    });

    if (response?.error) {
      return { success: false, message: response?.error };
    }

    revalidatePath('/admin/donors');
    revalidatePath('/admin/donors/add');
    revalidatePath('/admin/donations');
    revalidatePath('/admin/donations/add');
    revalidatePath('/');

    return { success: true, message: 'sucesso' };
  } catch (error) {
    return { success: false, message: null, error };
  }
}
