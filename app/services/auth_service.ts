import User from '#models/user'
import RegisterRequest from '../dtos/request/register_request.js'

export default class AuthService {
  async login(email: string, password: string): Promise<User> {
    const user = await User.verifyCredentials(email, password)

    return user
  }

  async register(registerRequest: RegisterRequest): Promise<User> {
    if (registerRequest.password !== registerRequest.passwordConfirmation) {
      throw new Error('Password and password confirmation do not match')
    }

    const user = new User()
    user.email = registerRequest.email
    user.password = registerRequest.password
    user.fullName = registerRequest.fullName

    return await user.save()
  }
}
