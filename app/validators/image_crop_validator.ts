import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const imageCropValidator = vine.compile(
  vine.object({
    x: vine.number(),
    y: vine.number(),
    width: vine.number(),
    height: vine.number(),
    zoom: vine.number(),
    image: vine
      .file({
        size: '4mb',
        extnames: ['jpg', 'png', 'jpeg', 'heic'],
      })
      .optional(),
    imageUrl: vine.string().optional(),
  })
)

export type ImageCrop = Infer<typeof imageCropValidator>
