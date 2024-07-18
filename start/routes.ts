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
        router.delete(':id', [BooksController, 'deleteBook'])
      })
      .prefix('books')
      .use(middleware.auth())

    router
      .group(() => {
        router.get('', [AuthorsController, 'getAuthors'])
      })
      .prefix('authors')
      .use(middleware.auth())
  })
  .prefix('api')
