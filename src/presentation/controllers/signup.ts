import { badRequest, serverError } from '../helpers/http-helper'
import { HttpResponse, HttpRequest, Controller, EmailValidator } from '../protocols'
import { InvalidParamError, MissingParamError } from '../errors'

export class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFileds = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFileds) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return badRequest(new MissingParamError(''))
    } catch (error) {
      return serverError()
    }
  }
}
