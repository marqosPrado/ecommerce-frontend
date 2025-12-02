import { adminOrdersManagementSelector as selector } from '../selectors/admin-orders-management-selectors';
import Chainable = Cypress.Chainable;

export class AdminOrdersManagementPage {
  visit(): void {
    cy.visit('http://localhost:4200/admin/orders')
    cy.wait(2000)
  }

  // Filtros
  clickFilterAll(): void {
    cy.get(selector.filterAllOrders).click()
  }

  clickFilterProcessing(): void {
    cy.get(selector.filterProcessing).click()
  }

  clickFilterApproved(): void {
    cy.get(selector.filterApproved).click()
  }

  clickFilterInTransit(): void {
    cy.get(selector.filterInTransit).click()
  }

  clickFilterDelivered(): void {
    cy.get(selector.filterDelivered).click()
  }

  // Tabela
  getOrdersTable(): Chainable {
    return cy.get(selector.ordersTable)
  }

  verifyTableHasOrders(): void {
    cy.get(selector.ordersTable).should('exist')
    cy.get(selector.ordersTable).find('tbody tr').should('have.length.gt', 0)
  }

  verifyEmptyTable(): void {
    cy.contains('Nenhum pedido encontrado').should('be.visible')
  }

  // Ações nos pedidos
  approveOrder(rowIndex: number = 0): void {
    cy.get(selector.ordersTable)
      .find(selector.btnApproveOrder)
      .eq(rowIndex)
      .click()
  }

  markInTransit(rowIndex: number = 0): void {
    cy.get(selector.ordersTable)
      .find(selector.btnInTransit)
      .eq(rowIndex)
      .click()
  }

  markDelivered(rowIndex: number = 0): void {
    cy.get(selector.ordersTable)
      .find(selector.btnDelivered)
      .eq(rowIndex)
      .click()
  }

  viewDetails(rowIndex: number = 0): void {
    cy.get(selector.ordersTable)
      .find(selector.btnViewDetails)
      .eq(rowIndex)
      .click()
  }

  // Confirmação
  confirmDialogAction(): void {
    cy.contains('button', 'Confirmar').should('be.visible').click()
    cy.wait(1000)
  }

  cancelDialogAction(): void {
    cy.contains('button', 'Cancelar').should('be.visible').click()
  }

  // Dialog de detalhes
  verifyDetailsDialogVisible(): void {
    cy.get(selector.orderDetailsDialog).should('be.visible')
  }

  verifyDetailsDialogContains(text: string): void {
    cy.get(selector.orderDetailsDialog).should('contain', text)
  }

  closeDetailsDialog(): void {
    cy.get('.p-dialog-header-close').click()
  }

  // Toast
  verifySuccessToast(): void {
    cy.get(selector.toast, { timeout: 10000 }).should('be.visible')
    cy.get(selector.toast).should('contain', 'Sucesso')
  }

  verifyToastContains(message: string): void {
    cy.get(selector.toast, { timeout: 10000 }).should('be.visible')
    cy.get(selector.toast).should('contain', message)
  }

  // Verificações de status
  verifyOrderStatus(status: string): void {
    cy.get(selector.ordersTable).should('contain', status)
  }

  // Contadores
  getProcessingCount(): Chainable {
    return cy.get(selector.filterProcessing).invoke('text')
  }

  getApprovedCount(): Chainable {
    return cy.get(selector.filterApproved).invoke('text')
  }

  getInTransitCount(): Chainable {
    return cy.get(selector.filterInTransit).invoke('text')
  }

  getDeliveredCount(): Chainable {
    return cy.get(selector.filterDelivered).invoke('text')
  }
}
