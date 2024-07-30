import type { HttpContext } from '@adonisjs/core/http'

import UserService from '#services/user_service'
import { EditUser, userValidator } from '#validators/edit_user_validator'
import { inject } from '@adonisjs/core'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async updateUser({ request, params, response }: HttpContext) {
    const userRequest: EditUser = await request.validateUsing(userValidator)
    const userId = params.id

    const user = await this.userService.updateUser(userId, userRequest)

    return response.json(user)
  }
}
