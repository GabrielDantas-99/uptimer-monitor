import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string({ required_error: 'Username is a required field!' })
    .min(4, { message: 'Least 4 characters are required!' })
    .optional(),
  email: z.string({ required_error: 'Email is a required field!' }).email(),
  password: z
    .string({ required_error: 'Password is a required field!' })
    .min(6, {
      message:
        'Password field must contain at least 6 characters, 1 capital letter and 1 number.',
    }),
});

export type RegisterType = z.infer<typeof registerSchema>;
