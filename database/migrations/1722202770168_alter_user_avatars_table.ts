import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('avatar_url').nullable()
      table.string('avatar_background_color').notNullable().defaultTo('0078D0')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('avatar_url')
      table.dropColumn('avatar_background_color')
    })
  }
}
