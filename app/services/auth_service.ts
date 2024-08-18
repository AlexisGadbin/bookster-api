import User from '#models/user'
import { inject } from '@adonisjs/core'
import RegisterRequest from '../dtos/request/register_request.js'
import UtilsService from './utils_service.js'

@inject()
export default class AuthService {
  constructor(private utilsService: UtilsService) {}

  async login(email: string, password: string): Promise<User> {
    const user = await User.verifyCredentials(email, password)

    return user
  }

  async register(registerRequest: RegisterRequest): Promise<User> {
    const existingUser = await User.findBy('email', registerRequest.email)

    if (existingUser) {
      throw new Error('Email already in use')
    }

    if (registerRequest.password !== registerRequest.passwordConfirmation) {
      throw new Error('Password and password confirmation do not match')
    }

    const user = new User()
    user.email = registerRequest.email
    user.password = registerRequest.password
    user.firstName = registerRequest.firstName
    user.lastName = registerRequest.lastName
    user.avatarBackgroundColor = await this.utilsService.getRandomColor()

    return await user.save()
  }
}
