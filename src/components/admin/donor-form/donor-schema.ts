import { z } from 'zod';

import { isValidCpfOrCnpj, isValidMobilePhone } from '@/shared/utils';

export const donorSchema = z.object({
  id: z.coerce.number().positive().optional(),
  name: z
    .string()
    .min(1, {
      message: 'Nome é obrigatório.',
    })
    .min(3, {
      message: 'Nome deve ter pelo menos 3 caracteres.',
    })
    .max(50, {
      message: 'Nome deve ter no máximo 50 caracteres.',
    }),
  document: z
    .string()
    .min(1, { message: 'Documento é obrigatório.' })
    .refine((value) => isValidCpfOrCnpj(value), {
      message: 'Documento deve ser um CPF ou CNPJ válido.',
    }),
  mobile: z
    .string()
    .min(1, {
      message: 'Celular é obrigatório.',
    })
    .refine((value) => isValidMobilePhone(value), {
      message: 'Celular deve ser válido.',
    }),
  email: z
    .string()
    .min(1, {
      message: 'E-mail é obrigatório.',
    })
    .min(8, {
      message: 'E-mail deve ter pelo menos 8 caracteres.',
    })
    .max(128, {
      message: 'E-mail deve ter no máximo 128 caracteres.',
    })
    .email('E-mail deve ser válido.'),
  site: z.string().optional(),
});
