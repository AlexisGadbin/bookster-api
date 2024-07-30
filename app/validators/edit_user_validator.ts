import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const userValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(1).maxLength(255),
    lastName: vine.string().trim().minLength(1).maxLength(255),
    email: vine.string().trim().email().maxLength(255),
    avatarUrl: vine.string().trim().maxLength(255).optional(),
    avatarBackgroundColor: vine.string().trim().maxLength(255),
  })
)

export type EditUser = Infer<typeof userValidator>
