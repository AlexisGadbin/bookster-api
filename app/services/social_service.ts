import User from '#models/user'
import { inject } from '@adonisjs/core'
import { GoogleUser } from '../utils/type.js'
import UtilsService from './utils_service.js'

@inject()
export default class SocialService {
  constructor(private utilsService: UtilsService) {}

  async googleAuth(googleUser: GoogleUser): Promise<User> {
    // const existingUser = await User.findBy('email', googleUser.email)

    // if (existingUser) {
    //   throw new Error('Email already in use')
    // }

    const user = await User.findBy('googleId', googleUser.id)

    if (user) {
      return user
    }

    const newUser = new User()
    newUser.googleId = googleUser.id
    newUser.email = googleUser.email
    newUser.firstName = 'Google'
    newUser.lastName = 'User'
    newUser.avatarBackgroundColor = await this.utilsService.getRandomColor()

    return await newUser.save()
  }

  async syncGoogleUser(googleUser: GoogleUser, user: User) {
    user.googleId = googleUser.id

    await user.save()
  }
}
