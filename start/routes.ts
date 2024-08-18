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
const SocialsController = () => import('#controllers/socials_controller')
const UsersController = () => import('#controllers/users_controller')
const AuthorsController = () => import('#controllers/authors_controller')
const BooksController = () => import('#controllers/books_controller')

router
  .group(() => {
    router.get('/', async () => {
      return {
        hello: 'world',
      }
    })

    router
      .group(() => {
        router.get('google', [SocialsController, 'googleRedirect'])
        router.get('google/callback', [SocialsController, 'googleCallback'])
        router.get('google/sync', [SocialsController, 'googleSync'])
      })
      .prefix('socials')
      .use(middleware.conditionalAuth())

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

    router
      .group(() => {
        router.get('', [BooksController, 'getBooks'])
        router.get(':id', [BooksController, 'getBook'])
        router.post('', [BooksController, 'createBook'])
        router.put(':id', [BooksController, 'updateBook'])
        router.delete(':id', [BooksController, 'deleteBook'])
      })
      .prefix('books')
      .use(middleware.auth())

    router
      .group(() => {
        router.get('', [BooksController, 'getMyWishlistedBooks'])
      })
      .prefix('wishlist')
      .use(middleware.auth())

    router
      .group(() => {
        router.put(':id', [UsersController, 'updateUser'])
      })
      .prefix('users')
      .use(middleware.auth())

    router
      .group(() => {
        router.get('', [AuthorsController, 'getAuthors'])
      })
      .prefix('authors')
      .use(middleware.auth())
  })
  .prefix('api')
