import { adminExchangeManagementSelector as selector } from '../selectors/admin-exchange-management-selectors';
import Chainable = Cypress.Chainable;

export class AdminExchangeManagementPage {
  visit(): void {
    cy.visit('http://localhost:4200/admin/exchanges')
    cy.wait(2000)
  }

  clickFilterPending(): void {
    cy.get(selector.filterPending).click()
  }

  clickFilterApproved(): void {
    cy.get(selector.filterApproved).click()
  }

  clickFilterInTransit(): void {
    cy.get(selector.filterInTransit).click()
  }

  clickFilterReceived(): void {
    cy.get(selector.filterReceived).click()
  }

  clickFilterCompleted(): void {
    cy.get(selector.filterCompleted).click()
  }

  clickFilterRejected(): void {
    cy.get(selector.filterRejected).click()
  }

  clickFilterAll(): void {
    cy.get(selector.filterAll).click()
  }

  getExchangesTable(): Chainable {
    return cy.get(selector.exchangesTable)
  }

  verifyTableHasExchanges(): void {
    cy.get(selector.exchangesTable).should('exist')
    cy.get(selector.exchangesTable).find('tbody tr').should('have.length.gt', 0)
  }

  verifyEmptyTable(): void {
    cy.contains('Nenhuma solicitação encontrada').should('be.visible')
  }

  approveExchange(rowIndex: number = 0): void {
    cy.get(selector.exchangesTable)
      .find(selector.btnApproveExchange)
      .eq(rowIndex)
      .should('be.visible')
      .click()
    cy.wait(1000)
  }

  rejectExchange(rowIndex: number = 0): void {
    cy.get(selector.exchangesTable)
      .find(selector.btnRejectExchange)
      .eq(rowIndex)
      .should('be.visible')
      .click()
    cy.wait(1000)
  }

  markInTransit(rowIndex: number = 0): void {
    cy.get(selector.exchangesTable)
      .find(selector.btnInTransitExchange)
      .eq(rowIndex)
      .should('be.visible')
      .click()
    cy.wait(1000)
  }

  confirmReceived(rowIndex: number = 0): void {
    cy.get(selector.exchangesTable)
      .find(selector.btnConfirmReceived)
      .eq(rowIndex)
      .should('be.visible')
      .click()
    cy.wait(1000)
  }

  completeExchange(rowIndex: number = 0): void {
    cy.get(selector.exchangesTable)
      .find(selector.btnCompleteExchange)
      .eq(rowIndex)
      .should('be.visible')
      .click()
    cy.wait(1000)
  }

  viewDetails(rowIndex: number = 0): void {
    cy.get(selector.exchangesTable)
      .find(selector.btnViewExchangeDetails)
      .eq(rowIndex)
      .click()
  }

  confirmDialogAction(): void {
    cy.get('body').then($body => {
      if ($body.find('.p-dialog.p-confirm-dialog').length > 0) {
        cy.log('Dialog encontrado - clicando no botão de confirmação')
        cy.get('.p-dialog.p-confirm-dialog').should('be.visible')
        cy.wait(500)
        cy.get('.p-confirm-dialog-accept').click()
        cy.wait(1000)
      }
      else if ($body.find('.p-dialog:visible').length > 0) {
        cy.log('Dialog genérico encontrado - procurando botão Confirmar')
        cy.contains('button', 'Gerar Cupom').click()
        cy.wait(1000)
      }
      else {
        cy.log('Procurando botão Confirmar diretamente')
        cy.contains('button', 'Confirmar', { timeout: 10000 }).should('be.visible').click()
        cy.wait(1000)
      }
    })
  }

  cancelDialogAction(): void {
    cy.contains('button', 'Cancelar', { timeout: 10000 }).should('be.visible').click()
    cy.wait(500)
  }

  verifyDetailsDialogVisible(): void {
    cy.get(selector.exchangeDetailsDialog).should('be.visible')
  }

  verifyDetailsDialogContains(text: string): void {
    cy.get(selector.exchangeDetailsDialog).should('contain', text)
  }

  closeDetailsDialog(): void {
    cy.get('.p-dialog-header-close').click()
  }

  // Toast
  verifySuccessToast(): void {
    cy.get(selector.toast, { timeout: 10000 }).should('be.visible')
  }

  verifyWarnToast(): void {
    cy.get(selector.toast, { timeout: 10000 }).should('be.visible')
  }

  verifyToastContains(message: string): void {
    cy.get(selector.toast, { timeout: 10000 }).should('be.visible')
    cy.get(selector.toast).should('contain', message)
  }
}
