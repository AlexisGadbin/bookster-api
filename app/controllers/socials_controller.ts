import SocialService from '#services/social_service'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { GoogleUser } from '../utils/type.js'

@inject()
export default class SocialsController {
  constructor(private socialService: SocialService) {}

  googleRedirect({ ally }: HttpContext) {
    ally.use('google').redirect()
  }

  googleSync({ ally }: HttpContext) {
    ally.use('google').redirect()
  }

  async googleCallback({ ally, auth, response }: HttpContext) {
    const google = ally.use('google')

    if (google.accessDenied()) {
      throw new Error('Access was denied')
    }

    if (google.stateMisMatch()) {
      throw new Error('Request state mis-match')
    }

    if (google.hasError()) {
      throw new Error(google.getError() ?? 'Failed to authenticate user')
    }

    const user: GoogleUser = await google.user()

    if (!auth.use('web').isAuthenticated) {
      const dbUser = await this.socialService.googleAuth(user)

      await auth.use('web').login(dbUser)
    } else {
      const authUser = auth.use('web').user!

      this.socialService.syncGoogleUser(user, authUser)
    }

    return response.redirect(env.get('CLIENT_URL'))
  }
}
