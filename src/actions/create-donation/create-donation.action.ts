'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { createDonationHttp } from '@/http';

import { donationSchema } from '@/components/admin/donation-form/donation-schema';

export async function createDonationAction(formData: FormData) {
  const formDataObject = Object.fromEntries(formData.entries());
  const donationSchemaValidation = donationSchema.safeParse(formDataObject);
  const donation = donationSchemaValidation.data!;

  if (!donationSchemaValidation.success) {
    const errors = donationSchemaValidation.error.flatten().fieldErrors;

    return { success: false, message: 'Erro na validação de dados', errors };
  }

  try {
    const accessToken = cookies().get('accessToken')?.value;

    if (!accessToken) {
      return {
        message: 'Um erro inesperado ocorreu!',
      };
    }

    const response = await createDonationHttp({
      accessToken,
      donation,
    });

    if (response?.error) {
      return { success: false, message: response?.error };
    }

    revalidatePath('/admin/donations');
    revalidatePath('/admin/donations/add');
    revalidatePath('/');

    return { success: true, message: 'sucesso' };
  } catch (error) {
    return { success: false, message: null, error };
  }
}
