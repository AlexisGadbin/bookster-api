import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const editBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    description: vine.string().trim().minLength(3).maxLength(1000),
    authorId: vine.number().positive(),
  })
)

export type EditBook = Infer<typeof editBookValidator>
