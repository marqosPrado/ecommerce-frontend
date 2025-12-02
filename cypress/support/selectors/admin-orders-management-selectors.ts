export const adminOrdersManagementSelector = {
  // Filtros
  filterAllOrders: '[data-cy="filter-all-orders"]',
  filterProcessing: '[data-cy="filter-processing"]',
  filterApproved: '[data-cy="filter-approved"]',
  filterInTransit: '[data-cy="filter-in-transit"]',
  filterDelivered: '[data-cy="filter-delivered"]',

  // Tabela
  ordersTable: '[data-cy="orders-table"]',

  // Botões de ação
  btnApproveOrder: '[data-cy="btn-approve-order"]',
  btnInTransit: '[data-cy="btn-in-transit"]',
  btnDelivered: '[data-cy="btn-delivered"]',
  btnViewDetails: '[data-cy="btn-view-details"]',

  // Dialog
  orderDetailsDialog: '[data-cy="order-details-dialog"]',

  // Diálogo de confirmação
  confirmDialog: '.p-confirm-dialog',

  // Toast
  toast: '.p-toast'
}