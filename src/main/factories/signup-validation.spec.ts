import { RequiredFieldValidation } from '../../presentation/helpers/validator/required-field-validation'
import { Validation } from '../../presentation/helpers/validator/validation'
import { ValidationComposite } from '../../presentation/helpers/validator/validation-composite'
import { makeSignUpValidation } from './signug-validation'

jest.mock('../../presentation/helpers/validator/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
