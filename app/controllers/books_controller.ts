import BookService from '#services/book_service'
import { EditBook, editBookValidator } from '#validators/edit_book_validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class BooksController {
  constructor(private bookService: BookService) {}

  async getBooks({ request, response }: HttpContext) {
    const qs = request.qs()
    const limit = qs.limit ? Number.parseInt(qs.limit) : 10
    const page = qs.page ? Number.parseInt(qs.page) : 1
    const search = qs.search ? qs.search : ''

    const books = await this.bookService.getBooks(limit, page, search)

    return response.json(books)
  }

  async getMyWishlistedBooks({ auth, request, response }: HttpContext) {
    const qs = request.qs()
    const limit = qs.limit ? Number.parseInt(qs.limit) : 10
    const page = qs.page ? Number.parseInt(qs.page) : 1
    const userId = auth.use('web').user!.id
    const books = await this.bookService.getMyWishlistedBooks(limit, page, userId)

    return response.json(books)
  }

  async getBook({ params, response }: HttpContext) {
    const book = await this.bookService.getBook(params.id)

    return response.json(book)
  }

  async createBook({ request, response, auth }: HttpContext) {
    const bookRequest: EditBook = await request.validateUsing(editBookValidator)
    const userId = auth.use('web').user!.id

    const book = await this.bookService.createBook(bookRequest, userId)

    return response.json(book)
  }

  async updateBook({ params, request, response, auth }: HttpContext) {
    console.log('updateBook', request.body())
    const bookRequest: EditBook = await request.validateUsing(editBookValidator)
    const userId = auth.use('web').user!.id
    const book = await this.bookService.updateBook(params.id, bookRequest, userId)

    return response.json(book)
  }

  async deleteBook({ params, response, auth }: HttpContext) {
    const userId = auth.use('web').user!.id
    await this.bookService.deleteBook(params.id, userId)

    return response.json({ message: 'Book deleted successfully' })
  }
}
