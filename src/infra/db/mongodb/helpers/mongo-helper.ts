// import { MongoClient } from "mongodb"

import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null,
  uri: null,
  connected: false,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    const mongo = new MongoClient(this.uri)
    this.client = await mongo.connect()
    this.connected = true
    this.client.on('topologyClosed', () => { this.connected = false })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getColletion (name: string): Promise<Collection> {
    if (!this.client || !this.connected) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: (colletion: any): any => {
    const { _id, ...colletionWithoutId } = colletion
    return Object.assign({}, { id: _id }, colletionWithoutId)
  }
}
