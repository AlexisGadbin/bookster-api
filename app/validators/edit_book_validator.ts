import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const editBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    description: vine.string().nullable(),
    authorName: vine.string().trim().minLength(3).maxLength(255),
    coverImage: vine
      .file({
        size: '4mb',
        extnames: ['jpg', 'png', 'jpeg', 'heic'],
      })
      .optional(),
    backCoverImage: vine
      .file({
        size: '4mb',
        extnames: ['jpg', 'png', 'jpeg', 'heic'],
      })
      .optional(),
    isWishlisted: vine.boolean(),
    note: vine.number().min(0).max(10).nullable(),
  })
)

export type EditBook = Infer<typeof editBookValidator>
