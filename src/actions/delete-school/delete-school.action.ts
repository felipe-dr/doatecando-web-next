'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { deleteSchoolHttp } from '@/http';

export async function deleteSchoolAction(formData: FormData) {
  try {
    const accessToken = cookies().get('accessToken')?.value;
    const id = Number(formData.get('id'))!;

    if (!accessToken) {
      return {
        message: 'Um erro inesperado ocorreu!',
      };
    }

    const response = await deleteSchoolHttp({ id, accessToken });

    if (response?.error) {
      let responseMessage: string = '';

      if (response.statusCode === '400') {
        responseMessage = 'Verifique se a escola está associada a uma doação.';
      }

      return { success: false, message: responseMessage };
    }

    revalidatePath('/admin/donors');
    revalidatePath('/admin/donors/add');
    revalidatePath('/admin/donations');
    revalidatePath('/admin/donations/add');
    revalidatePath('/admin/schools');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
