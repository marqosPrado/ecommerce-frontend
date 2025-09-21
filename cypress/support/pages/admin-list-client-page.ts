
import { adminListClientSelector as selector } from '../selectors/admin-list-client-selectors';
import Chainable = Cypress.Chainable;

export class AdminListClientPage {
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

  fillPhone(phone: string): void {
    cy.get(selector.inputPhone).clear()
    cy.get(selector.inputPhone).type(phone)
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

  confirmDialogAction(confirm = true): void {
    cy.get(selector.confirmDialog).within(() => {
      cy.contains(confirm ? 'Sim' : 'Não').click()
    })
  }

  getToast(): Chainable {
    return cy.get(selector.toast)
  }
}
