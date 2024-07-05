import BookMapper from '#mappers/book_mapper'
import Book from '#models/book'
import { EditBook } from '#validators/edit_book_validator'
import { inject } from '@adonisjs/core'
import BookDto from '../dtos/book_dto.js'
import AuthorService from './author_service.js'
import UserService from './user_service.js'

@inject()
export default class BookService {
  constructor(
    private userService: UserService,
    private authorService: AuthorService
  ) {}

  async createBook(book: EditBook, userId: number): Promise<BookDto> {
    const user = await this.userService.getById(userId)
    const author = await this.authorService.getAuthor(book.authorId)
    const savedBook = await Book.create({
      title: book.title,
      description: book.description,
    })
    await savedBook.related('author').associate(author)
    await savedBook.related('contributor').associate(user)

    return BookMapper.toDto(savedBook)
  }

  async getBooks(): Promise<BookDto[]> {
    const books = await Book.query().preload('author').preload('contributor')

    return books.map((book) => BookMapper.toDto(book))
  }

  async getBook(id: number): Promise<BookDto> {
    const book = await Book.query()
      .where('id', id)
      .preload('author')
      .preload('contributor')
      .firstOrFail()

    return BookMapper.toDto(book)
  }

  async updateBook() {
    // Implement this method
  }

  async deleteBook(id: number): Promise<void> {
    const book = await Book.findOrFail(id)
    await book.delete()
  }
}
