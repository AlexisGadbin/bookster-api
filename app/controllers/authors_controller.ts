import type { HttpContext } from '@adonisjs/core/http'

import AuthorService from '#services/author_service'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthorsController {
  constructor(private authorService: AuthorService) {}

  async getAuthors({ response }: HttpContext) {
    const authors = await this.authorService.getAuthors()

    return response.json(authors)
  }
}
