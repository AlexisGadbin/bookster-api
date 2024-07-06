import Author from '#models/author'
import AuthorDto from '../dtos/author_dto.js'

export default class AuthorMapper {
  static toDto(author: Author): AuthorDto {
    return {
      id: author.id,
      name: author.name,
    }
  }
}
