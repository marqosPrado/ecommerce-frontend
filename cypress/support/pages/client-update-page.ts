import { clientEditSelectors as selector } from '../selectors/client-edit-selectors';
import Chainable = Cypress.Chainable;

export class ClientUpdatePage {

  changeName(fullName: string): void {
    cy.get(selector.fullName).clear()
    cy.get(selector.fullName).type(fullName);
  }

  changePhoneNumber(phoneNumber: string): void {
    cy.get(selector.phoneNumber).clear()
    cy.get(selector.phoneNumber).type(phoneNumber);
  }

  changeGender(genderLabel: string): void {
    cy.get(selector.gender, { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.get('.p-select-panel', { timeout: 10000 })
      .should('be.visible');

    cy.contains('.p-select-option', genderLabel, { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.get(selector.gender)
      .should('contain.text', genderLabel);
  }

  getEmailInput(): Chainable {
    return cy.get(selector.email).should('exist').should('be.visible');
  }

  getCpfInput(): Chainable {
    return cy.get(selector.cpf).should('exist').should('be.visible');
  }

  getDataBirthInput(): Chainable {
    return cy.get(selector.birthDate).should('exist').should('be.visible');
  }

  clickBtnToUpdate(): void {
    cy.get(selector.btnUpdate)
      .should('exist')
      .should('be.visible')
      .click();
  }

  confirmChange(): void {
    cy.contains('button', 'Sim').click()
      .then(() => {
        cy.get(selector.toast)
          .should('be.visible')
          .contains('Alterações salvas com sucesso!')
      })
  }
}
