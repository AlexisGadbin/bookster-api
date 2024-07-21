import AuthorDto from './author_dto.js'
import UserDto from './user_dto.js'

export default class BookDto {
  declare id: number
  declare title: string
  declare description: string
  declare author: AuthorDto
  declare contributor: UserDto
}
