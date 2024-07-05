/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router
  .get('/', async () => {
    return {
      hello: 'world',
    }
  })
  .use(middleware.auth())

router
  .group(() => {
    router.delete('logout', [AuthController, 'logout'])
    router.get('current-user', [AuthController, 'currentUser'])
  })
  .prefix('auth')
  .use(middleware.auth())

router
  .group(() => {
    router.post('login', [AuthController, 'login'])
    router.post('register', [AuthController, 'register'])
  })
  .prefix('auth')
  .use(middleware.guest())
