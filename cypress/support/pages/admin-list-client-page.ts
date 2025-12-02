
import { adminListClientSelector as selector } from '../selectors/admin-list-client-selectors';
import Chainable = Cypress.Chainable;

export class AdminListClientPage {
  getNameInput(): Chainable {
    return cy.get(selector.inputName)
  }

  fillName(name: string): void {
    cy.get(selector.inputName).clear()
    cy.get(selector.inputName).type(name)
  }

  fillCpf(cpf: string): void {
    cy.get(selector.inputCpf).clear()
    cy.get(selector.inputCpf).type(cpf)
  }

  fillEmail(email: string): void {
    cy.get(selector.inputEmail).clear()
    cy.get(selector.inputEmail).type(email)
  }

  getPhoneNumberInput(): Chainable {
    return cy.get(selector.inputPhone);
  }

  fillPhone(phone: string): void {
    cy.get(selector.inputPhone)
      .should('exist')
      .should('be.visible')
      .type(phone)
  }

  selectGenderMasc(): void {
    cy.get(selector.inputGenderMasc).click()
  }

  selectGenderFemale(): void {
    cy.get(selector.inputGenderFemale).click()
  }

  selectGenderAll(): void {
    cy.get(selector.inputGenderAll).click()
  }

  selectStatusActive(): void {
    cy.get(selector.inputClientStatusActive).click()
  }

  selectStatusInactive(): void {
    cy.get(selector.inputClientStatusInactive).click()
  }

  selectStatusAll(): void {
    cy.get(selector.inputClientStatusAll).click()
  }

  clickSearch(): void {
    cy.get(selector.btnSearch).click()
  }

  getClientTable(): Chainable {
    return cy.get(selector.clientTable)
  }

  changeClientStatus(rowIndex = 0): void {
    cy.get(selector.clientTable)
      .find(selector.btnHandleStatus)
      .eq(rowIndex)
      .click()
  }

  confirmDialogAction(): void {
    // Aguarda o diálogo aparecer e clica no botão Confirmar
    cy.contains('button', 'Confirmar').should('be.visible').click()
  }

  cancelDialogAction(): void {
    // Aguarda o diálogo aparecer e clica no botão Cancelar
    cy.contains('button', 'Cancelar').should('be.visible').click()
  }

  getToast(): Chainable {
    return cy.get(selector.toast)
  }
}
