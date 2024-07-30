import User from '#models/user'
import { EditUser } from '#validators/edit_user_validator'

export default class UserService {
  async getById(id: number) {
    return await User.findOrFail(id)
  }

  async updateUser(id: number, user: EditUser) {
    const userToUpdate = await User.findOrFail(id)
    userToUpdate.merge(user)

    await userToUpdate.save()

    return userToUpdate
  }
}
