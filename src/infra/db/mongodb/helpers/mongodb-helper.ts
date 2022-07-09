// import { MongoClient } from "mongodb"

const { MongoClient } = require('mongodb')

export const MongoHelper = {
  client: null,
  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.cliente.disconnect()
  }
}
