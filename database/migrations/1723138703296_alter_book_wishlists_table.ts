import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_wishlisted').defaultTo(false).notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('is_wishlisted')
    })
  }
}
