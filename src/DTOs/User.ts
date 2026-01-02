  import { z } from 'zod';

  export const User = z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: 'Name is required',})
      .regex(/^[\p{L}\s]+$/u, {
        message: 'Name must contain only letters',}),

    email: z
      .string({
        invalid_type_error: 'Email must be a string',
        required_error: 'Email is required',})
      .email({ message: 'Invalid email address' }),

    phone: z
      .string({
        invalid_type_error: 'Phone number must be a string',})
      .regex(/^\(\d{2}\)\s\d{5}-\d{4}$/, {
        message: 'Phone number should be in the format (99) 99999-9999',})
      .optional(),

    password: z
      .string({
        invalid_type_error: 'Password must be a string',})
      .min(8, {
        message: 'Password must be at least 8 characters long',})
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',})
      .regex(/[0-9]/, {
        message: 'Password must contain at least one number',})
      .regex(/[^A-Za-z0-9]/, {
        message: 'Password must contain at least one special character',}),

    type: z
      .enum(['ADMIN', 'CLIENT', 'ORGANIZER'],{
        invalid_type_error: 'Invalid user type',
        required_error: 'User type is required'
      }),
    
  });

  export const UserUpdate = User.partial();

  export type UserInput = z.infer<typeof User>
  export type UserUpdateInput = z.infer<typeof UserUpdate>
  