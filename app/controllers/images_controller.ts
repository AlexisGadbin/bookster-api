import ImageService from '#services/image_service'
import { ImageCrop, imageCropValidator } from '#validators/image_crop_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ImagesController {
  constructor(private imageService: ImageService) {}

  async cropImage({ request, response }: HttpContext) {
    const imageCrop: ImageCrop = await request.validateUsing(imageCropValidator)

    const resizedImage = await this.imageService.cropImage(imageCrop)

    response.header('Content-Type', 'image/jpeg')
    return response.send(resizedImage)
  }
}
