import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Author from './author.js'
import User from './user.js'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare coverImageUrl: string | null

  @column()
  declare backCoverImageUrl: string | null

  @column()
  declare isWishlisted: boolean

  @column()
  declare authorId: number

  @column()
  declare contributorId: number

  @column()
  declare note: number | null

  @belongsTo(() => Author)
  declare author: BelongsTo<typeof Author>

  @belongsTo(() => User, {
    foreignKey: 'contributorId',
  })
  declare contributor: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
