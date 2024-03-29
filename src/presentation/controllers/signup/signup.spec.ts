import { SignUpController } from './signup'
import { AccountModel, AddAccount, AddAccountModel, HttpRequest, Validation } from '../signup/signup-protocols'
import { MissingParamError, ServerError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount { // Stub - um dublê de testes
    async add (account: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccout()))
    }
  }
  return new AddAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation { // Stub - um dublê de testes
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeFakeAccout = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})
interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const sut = new SignUpController(addAccountStub, validationStub)
  return {
    sut,
    addAccountStub,
    validationStub
  }
}

describe('SingUp Controller', () => {
  test('Should call AddAccount with correct values', async () => {
    // padrão de variável inicada com sut (System Under Test)
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    // padrão de variável inicada com sut (System Under Test)
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    /* .mockImplementationOnce(async () => {
      throw new Promise((resolve, reject) => reject(new Error()))
    }) */
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Should return 200 if valid data is provided', async () => {
    // padrão de variável inicada com sut (System Under Test)
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccout()))
  })

  test('Should call Validation with correct value', async () => {
    // padrão de variável inicada com sut (System Under Test)
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation returns an error', async () => {
    // padrão de variável inicada com sut (System Under Test)
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValue(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
