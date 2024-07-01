import User from '#models/user'
import UserDto from '../dtos/user_dto.js'

export default class UserMapper {
  static toDto(user: User): UserDto {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
    }
  }
}
