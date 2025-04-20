import { z } from 'zod';

import { PHONE_PATTERN } from '@/shared/patterns';

export const signupDialogSchema = z.object({
  id: z.coerce.number().positive().optional(),
  name: z.string().min(1, {
    message: 'Nome é obrigatório.',
  }),
  street: z.string().min(1, {
    message: 'Rua é obrigatória.',
  }),
  number: z.string().min(1, {
    message: 'Número obrigatório.',
  }),
  postalCode: z
    .string()
    .min(8, {
      message: 'CEP é obrigatório.',
    })
    .regex(/^\d{5}-?\d{3}$/, {
      message: 'CEP inválido.',
    }),
  latitude: z.coerce.number({
    invalid_type_error: 'Latitude deve ser um número.',
  }),
  longitude: z.coerce.number({
    invalid_type_error: 'Longitude deve ser um número.',
  }),
  neighbourhood: z.string().min(1, {
    message: 'Bairro é obrigatório.',
  }),
  unprivilegedArea: z
    .union([z.boolean(), z.literal('true'), z.literal('false')])
    .refine(
      (value) => {
        if (typeof value === 'string') {
          return value === 'true' || value === 'false';
        }

        return true;
      },
      {
        message:
          'Área carente deve ser uma string "true" ou "false", ou um booleano.',
      },
    )
    .transform((value) => {
      if (typeof value === 'string') {
        return value === 'true';
      }

      return value;
    }),
  urgency: z.string().min(1, {
    message: 'Nível de urgência é obrigatório.',
  }),
  quantityOfStudents: z.coerce.number().positive({
    message: 'Quantidade de estudantes deve ser maior que 0.',
  }),
  availability: z.string().min(1, {
    message: 'Disponibilidade é obrigatória.',
  }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || PHONE_PATTERN.test(val), {
      message: 'Telefone inválido. Use o formato (99) 9999-9999',
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
  password: z
    .string()
    .min(1, {
      message: 'Senha é obrigatória.',
    })
    .min(5, {
      message: 'Senha deve ter pelo menos 5 caracteres.',
    })
    .max(128, {
      message: 'Senha deve ter no máximo 128 caracteres.',
    }),
});
