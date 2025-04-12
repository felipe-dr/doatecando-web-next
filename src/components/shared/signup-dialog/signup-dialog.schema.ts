import { z } from 'zod';

export const signupDialogSchema = z.object({
  name: z.string().min(1, {
    message: 'Nome é obrigatório.',
  }),
  street: z.string().min(1, {
    message: 'Rua é obrigatória.',
  }),
  number: z.string().min(1, {
    message: 'Número obrigatório.',
  }),
  postalCode: z.string().min(8, {
    message: 'CEP é obrigatório.',
  }),
  neighbourhood: z.string().min(1, {
    message: 'Bairro é obrigatório.',
  }),
  unprivilegedArea: z.boolean(),
  urgency: z.string().min(1, {
    message: 'Nível de urgência é obrigatório.',
  }),
  quantityOfStudents: z.coerce.number().positive({
    message: 'Quantidade de estudantes deve ser maior que 0.',
  }),
  availability: z.string().min(1, {
    message: 'Disponibilidade é obrigatória.',
  }),
  phone: z.string(),
  email: z
    .string()
    .min(1, {
      message: 'E-mail é obrigatório.',
    })
    .min(8, {
      message: 'E-mail deve ter pelo menos 8 caracteres.',
    })
    .max(128, {
      message: 'E-mail deve ter no máximo 255 caracteres.',
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
