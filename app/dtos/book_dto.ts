import AuthorDto from './author_dto.js'
import UserDto from './user_dto.js'

export default class BookDto {
  declare id: number
  declare title: string
  declare description: string | null
  declare author: AuthorDto
  declare contributor: UserDto
  declare coverImageUrl: string | null
  declare backCoverImageUrl: string | null
  declare isWishlisted: boolean
  declare note: number | null
}
