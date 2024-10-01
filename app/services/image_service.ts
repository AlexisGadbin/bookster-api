import { ImageCrop } from '#validators/image_crop_validator'
import { inject } from '@adonisjs/core'
import sharp, { Sharp } from 'sharp'
import { S3Service } from './s3_service.js'

@inject()
export default class ImageService {
  constructor(private s3Service: S3Service) {}

  async cropImage(imageCrop: ImageCrop): Promise<Buffer> {
    let sharpImage: Sharp | undefined

    if (imageCrop.image) {
      sharpImage = sharp(imageCrop.image.tmpPath)
    } else if (imageCrop.imageUrl) {
      const url = new URL(imageCrop.imageUrl)
      const image: File = await this.s3Service.getImage(url.pathname.substring(1))
      sharpImage = sharp(await image.arrayBuffer())
    }

    if (!sharpImage) {
      throw new Error('Image path is required')
    }

    const resizedImage = await sharpImage
      .extract({
        width: imageCrop.width,
        height: imageCrop.height,
        left: imageCrop.x,
        top: imageCrop.y,
      })
      .toBuffer()

    return resizedImage
  }
}
