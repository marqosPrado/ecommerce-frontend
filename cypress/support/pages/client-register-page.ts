import { registerClientSelectors as selector } from '../selectors/client-register-selectors'

export interface BasicClientDataStep {
  fullName: string,
  cpf: string,
  gender: string,
  birthDate: string,
  typePhoneNumber: string,
  phoneNumber: string,
  email: string,
  password: string,
  confirmPassword: string
}

export class ClientRegisterPage {
  fillStep1(data: BasicClientDataStep) {
    cy.get(selector.fullName). type(data.fullName)
    cy.get(selector.cpf). type(data.cpf)
    cy.get(selector.gender).click().contains(data.gender).click()
    cy.get(selector.birthDate).type(data.birthDate)
    cy.get(selector.typePhoneNumber).click().contains(data.typePhoneNumber).click()
    cy.get(selector.phoneNumber).type(data.phoneNumber)
    cy.get(selector.email).type(data.email)
    cy.get(selector.password).type(data.password)
    cy.get(selector.confirmPassword).type(data.confirmPassword)
    cy.get(selector.btnNextStep)
      .should('be.visible')
      .and('be.enabled')
      .click()
  }
}
