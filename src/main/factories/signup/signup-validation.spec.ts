import { CompareFieldValidation } from '../../../presentation/helpers/validator/compare-field-validation'
import { EmailValidation } from '../../../presentation/helpers/validator/email-validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validator/required-field-validation'
import { Validation } from '../../../presentation/helpers/validator/validation'
import { ValidationComposite } from '../../../presentation/helpers/validator/validation-composite'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { makeSignUpValidation } from './signug-validation'

jest.mock('../../../presentation/helpers/validator/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator { // Stub - um dublê de testes
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
