import Book from '#models/book'
import BookDto from '../dtos/book_dto.js'

export default class BookMapper {
  static toDto(book: Book): BookDto {
    return {
      id: book.id,
      title: book.title,
      description: book.description,
      author: book.author,
      contributor: book.contributor,
      coverImageUrl: book.coverImageUrl,
      backCoverImageUrl: book.backCoverImageUrl,
      isWishlisted: book.isWishlisted,
    }
  }
}
