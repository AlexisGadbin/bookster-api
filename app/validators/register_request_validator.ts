import vine from '@vinejs/vine'

export const registerRequestValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(3).maxLength(255),
    lastName: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().trim().email().maxLength(255),
    password: vine.string().minLength(6).maxLength(255),
    passwordConfirmation: vine.string().minLength(6).maxLength(255),
  })
)
