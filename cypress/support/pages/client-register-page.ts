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

export interface ClientAddressDataStep {
  typeResidence: string,
  typePlace: string,
  street: string,
  number: string,
  neighborhood: string,
  cep: string,
  city: string,
  stateId: string,
  country: string,
  observations: string,
}

export interface ClientCreditCardDataStep {
  cardNumber: string,
  printedName: string,
  cardFlag: string,
  securityCode: string
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

  fillAddressStep2(data: ClientAddressDataStep) {
    cy.get(selector.typeResidence).click().contains(data.typeResidence).click()
    cy.get(selector.typePlace).click().contains(data.typePlace).click()
    cy.get(selector.street).type(data.street)
    cy.get(selector.number).type(data.number)
    cy.get(selector.neighborhood).type(data.neighborhood)
    cy.get(selector.cep).type(data.cep)
    cy.get(selector.city).type(data.city)
    cy.get(selector.state).click().contains(data.stateId).click()
    cy.get(selector.country).type(data.country)
    cy.get(selector.observations).type(data.observations)
    cy.get(selector.btnNextStep2)
      .should('be.visible')
      .and('be.enabled')
      .click()
  }

  fillCreditCardDataStep3(data: ClientCreditCardDataStep) {
    cy.get(selector.cardNumber).type(data.cardNumber)
    cy.get(selector.printedName).type(data.printedName)
    cy.get(selector.cardFlag).click().contains(data.cardFlag).click()
    cy.get(selector.securityCode).type(data.securityCode)
    cy.get(selector.registerClientButton)
      .should('be.visible')
      .and('be.enabled')
      .click()
      .then(() => {
        cy.get(selector.toast)
          .should('be.visible')
          .contains('Cliente registrado com sucesso!')
      })
  }
}
