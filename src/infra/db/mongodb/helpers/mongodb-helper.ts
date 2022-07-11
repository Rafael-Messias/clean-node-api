// import { MongoClient } from "mongodb"

import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null,
  async connect (url: string): Promise<void> {
    const mongo = new MongoClient(url)
    this.client = await mongo.connect()
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getColletion (name: string): Collection {
    return this.client.db().collection(name)
  }
}
