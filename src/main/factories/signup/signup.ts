import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-respository/log'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecotaror } from '../decorators/log'
import { makeSignUpValidation } from './signug-validation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const addAcount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(addAcount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecotaror(signUpController, logMongoRepository)
}
