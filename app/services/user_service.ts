import User from '#models/user'

export default class UserService {
  async getById(id: number) {
    return await User.findOrFail(id)
  }
}
