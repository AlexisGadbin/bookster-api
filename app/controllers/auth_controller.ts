import AuthService from '#services/auth_service'
import { registerRequestValidator } from '#validators/register_request_validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import RegisterRequest from '../dtos/request/register_request.js'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await this.authService.login(email, password)

    await auth.use('web').login(user)

    return response.noContent()
  }

  async register({ request, response, auth }: HttpContext) {
    const registerRequest: RegisterRequest = await request.validateUsing(registerRequestValidator)

    const user = await this.authService.register(registerRequest)

    await auth.use('web').login(user)

    return response.noContent()
  }

  async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()

    return response.noContent()
  }

  async currentUser({ response, auth }: HttpContext) {
    return response.ok(auth.use('web').user)
  }
}
