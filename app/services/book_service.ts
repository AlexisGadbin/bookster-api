import BookMapper from '#mappers/book_mapper'
import Book from '#models/book'
import { EditBook } from '#validators/edit_book_validator'
import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import fs from 'node:fs'
import BookDto from '../dtos/book_dto.js'
import AuthorService from './author_service.js'
import { S3Service } from './s3_service.js'
import UserService from './user_service.js'

@inject()
export default class BookService {
  constructor(
    private userService: UserService,
    private authorService: AuthorService,
    private s3Service: S3Service
  ) {}

  async createBook(book: EditBook, userId: number): Promise<BookDto> {
    const user = await this.userService.getById(userId)
    let author = await this.authorService.getAuthorByName(book.authorName)
    if (!author) {
      author = await this.authorService.createAuthor(book.authorName)
    }

    let coverImageUrl = null

    if (book.coverImage && book.coverImage.tmpPath && book.coverImage.type) {
      const fileContent = fs.readFileSync(book.coverImage.tmpPath)
      const uploadResult = await this.s3Service.upload(
        fileContent,
        book.title + '_' + cuid(),
        book.coverImage.type
      )
      coverImageUrl = uploadResult.Location
    }

    const savedBook = await Book.create({
      title: book.title,
      description: book.description,
      coverImageUrl: coverImageUrl || undefined,
    })
    await savedBook.related('author').associate(author)
    await savedBook.related('contributor').associate(user)

    return BookMapper.toDto(savedBook)
  }

  async getBooks(limit: number, page: number): Promise<ModelPaginatorContract<Book>> {
    const books = await Book.query()
      .preload('author')
      .preload('contributor')
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    books.baseUrl('/books')

    return books
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

  async deleteBook(id: number, userId: number): Promise<void> {
    const book = await Book.findOrFail(id)

    if (book.contributorId !== userId) {
      throw new Error('You are not allowed to delete this book')
    }

    if (book.coverImageUrl) {
      const url = new URL(book.coverImageUrl)
      this.s3Service.delete(url.pathname.substring(1))
    }

    await book.delete()
  }
}
