import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountColletion = await MongoHelper.getColletion('accounts')
    await accountColletion.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Rafael',
        email: 'rfamepi@hotmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
