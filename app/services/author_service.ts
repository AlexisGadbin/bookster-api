import AuthorMapper from '#mappers/author_mapper'
import Author from '#models/author'
import AuthorDto from '../dtos/author_dto.js'

export default class AuthorService {
  async getAuthors(): Promise<AuthorDto[]> {
    const authors = await Author.all()

    return authors.map((author) => AuthorMapper.toDto(author))
  }

  async getAuthor(id: number): Promise<Author> {
    return await Author.findOrFail(id)
  }
}
