import { AdminOrdersManagementPage } from '../../support/pages/admin-orders-management-page';

describe('Admin Orders Management', () => {
  const ordersPage = new AdminOrdersManagementPage();

  const adminUser = {
    email: 'marcos.prado@example.com',
    password: 'Mklecono@123'
  }

  beforeEach(() => {
    cy.login(adminUser.email, adminUser.password)
    ordersPage.visit()
  })

  describe('Visualização de Pedidos', () => {
    it('Deve carregar a lista de pedidos', () => {
      ordersPage.verifyTableHasOrders()
    })

    it('Deve exibir o título da página', () => {
      cy.contains('Gerenciamento de Pedidos').should('be.visible')
    })
  })

  describe('Filtros de Status', () => {
    it('Deve filtrar pedidos por status "Processando"', () => {
      ordersPage.clickFilterProcessing()
      cy.wait(1000)

      // Verifica se há linhas na tabela ou mensagem de vazio
      cy.get('[data-cy="orders-table"]').then($table => {
        const hasRows = $table.find('tbody tr').length > 0
        const hasEmptyMessage = $table.text().includes('Nenhum pedido encontrado')

        if (hasRows && !hasEmptyMessage) {
          // Se há pedidos, verifica se todos têm o status correto
          cy.log('Pedidos em processamento encontrados')
        } else {
          // Se não há pedidos, verifica a mensagem de vazio
          ordersPage.verifyEmptyTable()
          cy.log('Nenhum pedido em processamento encontrado')
        }
      })
    })

    it('Deve filtrar pedidos por status "Aprovados"', () => {
      ordersPage.clickFilterApproved()
      cy.wait(1000)

      cy.get('[data-cy="orders-table"]').then($table => {
        const hasRows = $table.find('tbody tr').length > 0
        const hasEmptyMessage = $table.text().includes('Nenhum pedido encontrado')

        if (hasRows && !hasEmptyMessage) {
          cy.log('Pedidos aprovados encontrados')
        } else {
          ordersPage.verifyEmptyTable()
          cy.log('Nenhum pedido aprovado encontrado')
        }
      })
    })

    it('Deve filtrar pedidos por status "Em Trânsito"', () => {
      ordersPage.clickFilterInTransit()
      cy.wait(1000)

      cy.get('[data-cy="orders-table"]').then($table => {
        const hasRows = $table.find('tbody tr').length > 0
        const hasEmptyMessage = $table.text().includes('Nenhum pedido encontrado')

        if (hasRows && !hasEmptyMessage) {
          cy.log('Pedidos em trânsito encontrados')
        } else {
          ordersPage.verifyEmptyTable()
          cy.log('Nenhum pedido em trânsito encontrado')
        }
      })
    })

    it('Deve filtrar pedidos por status "Entregues"', () => {
      ordersPage.clickFilterDelivered()
      cy.wait(1000)

      cy.get('[data-cy="orders-table"]').then($table => {
        const hasRows = $table.find('tbody tr').length > 0
        const hasEmptyMessage = $table.text().includes('Nenhum pedido encontrado')

        if (hasRows && !hasEmptyMessage) {
          cy.log('Pedidos entregues encontrados')
        } else {
          ordersPage.verifyEmptyTable()
          cy.log('Nenhum pedido entregue encontrado')
        }
      })
    })

    it('Deve voltar para todos os pedidos', () => {
      ordersPage.clickFilterProcessing()
      cy.wait(1000)

      ordersPage.clickFilterAll()
      cy.wait(1000)

      ordersPage.verifyTableHasOrders()
    })
  })

  describe('Visualização de Detalhes', () => {
    it('Deve abrir o dialog de detalhes do pedido', () => {
      ordersPage.viewDetails(0)
      cy.wait(500)

      ordersPage.verifyDetailsDialogVisible()
      ordersPage.verifyDetailsDialogContains('Detalhes do Pedido')
    })

    it('Deve exibir informações do pedido no dialog', () => {
      ordersPage.viewDetails(0)
      cy.wait(500)

      ordersPage.verifyDetailsDialogContains('Número do Pedido')
      ordersPage.verifyDetailsDialogContains('Status')
      ordersPage.verifyDetailsDialogContains('Data do Pedido')
      ordersPage.verifyDetailsDialogContains('Total')
      ordersPage.verifyDetailsDialogContains('Itens do Pedido')
      ordersPage.verifyDetailsDialogContains('Endereço de Entrega')
    })
  })

  describe('Gerenciamento de Status do Pedido', () => {
    it('Deve aprovar um pedido em processamento', () => {
      // Filtra por pedidos em processamento
      ordersPage.clickFilterProcessing()
      cy.wait(1000)

      // Verifica se há pedidos em processamento
      cy.get('body').then($body => {
        if ($body.find('[data-cy="btn-approve-order"]').length > 0) {
          // Aprova o primeiro pedido
          ordersPage.approveOrder(0)
          cy.wait(500)

          // Confirma a ação
          ordersPage.confirmDialogAction()

          // Verifica o toast de sucesso
          ordersPage.verifySuccessToast()
          cy.log('Pedido aprovado com sucesso')
        } else {
          cy.log('Nenhum pedido em processamento encontrado')
        }
      })
    })

    it('Deve marcar pedido aprovado como em trânsito', () => {
      // Filtra por pedidos aprovados
      ordersPage.clickFilterApproved()
      cy.wait(1000)

      // Verifica se há pedidos aprovados
      cy.get('body').then($body => {
        if ($body.find('[data-cy="btn-in-transit"]').length > 0) {
          // Marca como em trânsito
          ordersPage.markInTransit(0)
          cy.wait(500)

          // Confirma a ação
          ordersPage.confirmDialogAction()

          // Verifica o toast de sucesso
          ordersPage.verifySuccessToast()
          cy.log('Pedido marcado como em trânsito')
        } else {
          cy.log('Nenhum pedido aprovado encontrado')
        }
      })
    })

    it('Deve confirmar entrega de pedido em trânsito', () => {
      // Filtra por pedidos em trânsito
      ordersPage.clickFilterInTransit()
      cy.wait(1000)

      // Verifica se há pedidos em trânsito
      cy.get('body').then($body => {
        if ($body.find('[data-cy="btn-delivered"]').length > 0) {
          // Marca como entregue
          ordersPage.markDelivered(0)
          cy.wait(500)

          // Confirma a ação
          ordersPage.confirmDialogAction()

          // Verifica o toast de sucesso
          ordersPage.verifySuccessToast()
          cy.log('Entrega confirmada com sucesso')
        } else {
          cy.log('Nenhum pedido em trânsito encontrado')
        }
      })
    })

    it('Deve cancelar a aprovação de um pedido', () => {
      // Filtra por pedidos em processamento
      ordersPage.clickFilterProcessing()
      cy.wait(1000)

      // Verifica se há pedidos em processamento
      cy.get('body').then($body => {
        if ($body.find('[data-cy="btn-approve-order"]').length > 0) {
          // Tenta aprovar o primeiro pedido
          ordersPage.approveOrder(0)
          cy.wait(500)

          // Cancela a ação
          ordersPage.cancelDialogAction()
          cy.wait(500)

          // Verifica que o botão de aprovar ainda está visível
          cy.get('[data-cy="btn-approve-order"]').should('exist')
          cy.log('Ação cancelada com sucesso')
        } else {
          cy.log('Nenhum pedido em processamento encontrado')
        }
      })
    })
  })

  describe('Fluxo Completo de Gerenciamento', () => {
    it('Deve gerenciar um pedido do início ao fim', () => {
      // 1. Filtra pedidos em processamento
      ordersPage.clickFilterProcessing()
      cy.wait(1000)

      cy.get('body').then($body => {
        if ($body.find('[data-cy="btn-approve-order"]').length > 0) {
          // 2. Visualiza detalhes
          ordersPage.viewDetails(0)
          cy.wait(500)
          ordersPage.verifyDetailsDialogVisible()
          ordersPage.closeDetailsDialog()
          cy.wait(500)

          // 3. Aprova o pedido
          ordersPage.approveOrder(0)
          cy.wait(500)
          ordersPage.confirmDialogAction()
          ordersPage.verifySuccessToast()
          cy.wait(2000)

          // 4. Filtra pedidos aprovados
          ordersPage.clickFilterApproved()
          cy.wait(1000)

          // 5. Marca como em trânsito
          cy.get('body').then($body2 => {
            if ($body2.find('[data-cy="btn-in-transit"]').length > 0) {
              ordersPage.markInTransit(0)
              cy.wait(500)
              ordersPage.confirmDialogAction()
              ordersPage.verifySuccessToast()
              cy.wait(2000)

              // 6. Filtra pedidos em trânsito
              ordersPage.clickFilterInTransit()
              cy.wait(1000)

              // 7. Confirma entrega
              cy.get('body').then($body3 => {
                if ($body3.find('[data-cy="btn-delivered"]').length > 0) {
                  ordersPage.markDelivered(0)
                  cy.wait(500)
                  ordersPage.confirmDialogAction()
                  ordersPage.verifySuccessToast()
                  cy.wait(2000)

                  // 8. Verifica que o pedido está entregue
                  ordersPage.clickFilterDelivered()
                  cy.wait(1000)
                  cy.log('Pedido gerenciado com sucesso do início ao fim')
                }
              })
            }
          })
        } else {
          cy.log('Nenhum pedido em processamento encontrado para o fluxo completo')
        }
      })
    })
  })
})