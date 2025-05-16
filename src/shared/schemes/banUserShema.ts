import { z } from 'zod'

export const banUserReasonSchema = z.object({
  reason: z.string().nonempty('This field cannot be empty'),
})

export type BanUserReasonSchema = z.infer<typeof banUserReasonSchema>
