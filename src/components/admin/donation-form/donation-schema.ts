import { z } from 'zod';

export const donationSchema = z.object({
  id: z.coerce.number().positive().optional(),
  item: z.string().min(1, {
    message: 'Tipo do item é obrigatório.',
  }),
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
  condition: z.string().min(1, {
    message: 'Condição é obrigatória.',
  }),
  donorId: z.coerce.number().positive({
    message: 'Doador é obrigatório.',
  }),
  schoolId: z.coerce.number().positive({
    message: 'Escola é obrigatória.',
  }),
});
