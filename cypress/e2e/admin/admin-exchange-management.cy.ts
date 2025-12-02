import { AdminExchangeManagementPage } from '../../support/pages/admin-exchange-management-page';

describe('Admin Exchange Management', () => {
  const exchangePage = new AdminExchangeManagementPage();

  const adminUser = {
    email: 'marcos.prado@example.com',
    password: 'Mklecono@123'
  }

  beforeEach(() => {
    cy.login(adminUser.email, adminUser.password)
    exchangePage.visit()
  })

  describe('Visualização de Trocas', () => {
    it('Deve carregar a lista de trocas', () => {
      exchangePage.verifyTableHasExchanges()
    })

    it('Deve exibir o título da página', () => {
      cy.contains('Gerenciamento de Trocas e Devoluções').should('be.visible')
    })
  })

  describe('Filtros de Status', () => {
    it('Deve filtrar trocas por status "Pendentes"', () => {
      exchangePage.clickFilterPending()
      cy.wait(1000)

      cy.get('[data-cy="exchanges-table"]').then($table => {
        const hasRows = $table.find('tbody tr').length > 0
        const hasEmptyMessage = $table.text().includes('Nenhuma solicitação encontrada')

        if (hasRows && !hasEmptyMessage) {
          cy.log('Trocas pendentes encontradas')
        } else {
          exchangePage.verifyEmptyTable()
          cy.log('Nenhuma troca pendente encontrada')
        }
      })
    })

    it('Deve filtrar trocas por status "Aprovadas"', () => {
      exchangePage.clickFilterApproved()
      cy.wait(1000)

      cy.get('[data-cy="exchanges-table"]').then($table => {
        const hasRows = $table.find('tbody tr').length > 0
        const hasEmptyMessage = $table.text().includes('Nenhuma solicitação encontrada')

        if (hasRows && !hasEmptyMessage) {
          cy.log('Trocas aprovadas encontradas')
        } else {
          exchangePage.verifyEmptyTable()
          cy.log('Nenhuma troca aprovada encontrada')
        }
      })
    })

    it('Deve filtrar trocas por status "Em Trânsito"', () => {
      exchangePage.clickFilterInTransit()
      cy.wait(1000)

      cy.get('[data-cy="exchanges-table"]').then($table => {
        const hasRows = $table.find('tbody tr').length > 0
        const hasEmptyMessage = $table.text().includes('Nenhuma solicitação encontrada')

        if (hasRows && !hasEmptyMessage) {
          cy.log('Trocas em trânsito encontradas')
        } else {
          exchangePage.verifyEmptyTable()
          cy.log('Nenhuma troca em trânsito encontrada')
        }
      })
    })

    it('Deve filtrar trocas por status "Recebidas"', () => {
      exchangePage.clickFilterReceived()
      cy.wait(1000)

      cy.get('[data-cy="exchanges-table"]').then($table => {
        const hasRows = $table.find('tbody tr').length > 0
        const hasEmptyMessage = $table.text().includes('Nenhuma solicitação encontrada')

        if (hasRows && !hasEmptyMessage) {
          cy.log('Trocas recebidas encontradas')
        } else {
          exchangePage.verifyEmptyTable()
          cy.log('Nenhuma troca recebida encontrada')
        }
      })
    })

    it('Deve filtrar trocas por status "Concluídas"', () => {
      exchangePage.clickFilterCompleted()
      cy.wait(1000)

      cy.get('[data-cy="exchanges-table"]').then($table => {
        const hasRows = $table.find('tbody tr').length > 0
        const hasEmptyMessage = $table.text().includes('Nenhuma solicitação encontrada')

        if (hasRows && !hasEmptyMessage) {
          cy.log('Trocas concluídas encontradas')
        } else {
          exchangePage.verifyEmptyTable()
          cy.log('Nenhuma troca concluída encontrada')
        }
      })
    })

    it('Deve filtrar trocas por status "Rejeitadas"', () => {
      exchangePage.clickFilterRejected()
      cy.wait(1000)

      cy.get('[data-cy="exchanges-table"]').then($table => {
        const hasRows = $table.find('tbody tr').length > 0
        const hasEmptyMessage = $table.text().includes('Nenhuma solicitação encontrada')

        if (hasRows && !hasEmptyMessage) {
          cy.log('Trocas rejeitadas encontradas')
        } else {
          exchangePage.verifyEmptyTable()
          cy.log('Nenhuma troca rejeitada encontrada')
        }
      })
    })

    it('Deve voltar para todas as trocas', () => {
      exchangePage.clickFilterPending()
      cy.wait(1000)

      exchangePage.clickFilterAll()
      cy.wait(1000)

      exchangePage.verifyTableHasExchanges()
    })
  })

  describe('Visualização de Detalhes', () => {
    it('Deve abrir o dialog de detalhes da troca', () => {
      cy.wait(500)

      exchangePage.verifyDetailsDialogVisible()
      exchangePage.verifyDetailsDialogContains('Detalhes da Solicitação de Troca')
    })

    it('Deve exibir informações da troca no dialog', () => {
      cy.wait(500)

      exchangePage.verifyDetailsDialogContains('Número da Troca')
      exchangePage.verifyDetailsDialogContains('Pedido Original')
      exchangePage.verifyDetailsDialogContains('Cliente')
      exchangePage.verifyDetailsDialogContains('Tipo')
      exchangePage.verifyDetailsDialogContains('Status')
      exchangePage.verifyDetailsDialogContains('Valor da Troca')
      exchangePage.verifyDetailsDialogContains('Itens Solicitados para Troca')
    })
  })

  describe('Gerenciamento de Status da Troca', () => {
    it('Deve aprovar uma troca pendente', () => {
      exchangePage.clickFilterPending()
      cy.wait(1000)

      cy.get('body').then($body => {
        if ($body.find('[data-cy="btn-approve-exchange"]').length > 0) {
          exchangePage.approveExchange(0)
          exchangePage.confirmDialogAction()
          exchangePage.verifySuccessToast()
          cy.log('Troca aprovada com sucesso')
        } else {
          cy.log('Nenhuma troca pendente encontrada')
        }
      })
    })

    it('Deve rejeitar uma troca pendente', () => {
      exchangePage.clickFilterPending()
      cy.wait(1000)

      cy.get('body').then($body => {
        if ($body.find('[data-cy="btn-reject-exchange"]').length > 0) {
          exchangePage.rejectExchange(0)
          exchangePage.confirmDialogAction()
          exchangePage.verifyWarnToast()
          cy.log('Troca rejeitada')
        } else {
          cy.log('Nenhuma troca pendente encontrada')
        }
      })
    })

    it('Deve marcar troca aprovada como em trânsito', () => {
      exchangePage.clickFilterApproved()
      cy.wait(1000)

      cy.get('body').then($body => {
        if ($body.find('[data-cy="btn-in-transit-exchange"]').length > 0) {
          exchangePage.markInTransit(0)
          exchangePage.confirmDialogAction()
          cy.log('Troca marcada como em trânsito')
        } else {
          cy.log('Nenhuma troca aprovada encontrada')
        }
      })
    })

    it('Deve confirmar recebimento de troca em trânsito', () => {
      exchangePage.clickFilterInTransit()
      cy.wait(1000)

      cy.get('body').then($body => {
        if ($body.find('[data-cy="btn-confirm-received"]').length > 0) {
          exchangePage.confirmReceived(0)
          exchangePage.confirmDialogAction()
          exchangePage.verifySuccessToast()
          cy.log('Recebimento confirmado')
        } else {
          cy.log('Nenhuma troca em trânsito encontrada')
        }
      })
    })

    it('Deve gerar cupom e finalizar troca recebida', () => {
      exchangePage.clickFilterReceived()
      cy.wait(1000)

      cy.get('body').then($body => {
        if ($body.find('[data-cy="btn-complete-exchange"]').length > 0) {
          exchangePage.completeExchange(0)
          exchangePage.confirmDialogAction()
          exchangePage.verifySuccessToast()
          cy.log('Cupom gerado e troca finalizada')
        } else {
          cy.log('Nenhuma troca recebida encontrada')
        }
      })
    })

    it('Deve cancelar aprovação de uma troca', () => {
      exchangePage.clickFilterPending()
      cy.wait(1000)

      cy.get('body').then($body => {
        if ($body.find('[data-cy="btn-approve-exchange"]').length > 0) {
          exchangePage.approveExchange(0)
          exchangePage.cancelDialogAction()
          cy.get('[data-cy="btn-approve-exchange"]').should('exist')
          cy.log('Ação cancelada com sucesso')
        } else {
          cy.log('Nenhuma troca pendente encontrada')
        }
      })
    })
  })

  describe('Fluxo Completo de Gerenciamento', () => {
    it('Deve gerenciar uma troca do início ao fim', () => {
      // 1. Filtra trocas pendentes
      exchangePage.clickFilterPending()
      cy.wait(1000)

      cy.get('body').then($body => {
        if ($body.find('[data-cy="btn-approve-exchange"]').length > 0) {
          cy.wait(500)
          exchangePage.verifyDetailsDialogVisible()
          exchangePage.closeDetailsDialog()
          cy.wait(500)

          exchangePage.approveExchange(0)
          cy.wait(500)
          exchangePage.confirmDialogAction()
          cy.wait(2000)

          exchangePage.clickFilterApproved()
          cy.wait(1000)

          cy.get('body').then($body2 => {
            if ($body2.find('[data-cy="btn-in-transit-exchange"]').length > 0) {
              exchangePage.markInTransit(0)
              cy.wait(500)
              exchangePage.confirmDialogAction()
              cy.wait(2000)

              exchangePage.clickFilterInTransit()
              cy.wait(1000)

              cy.get('body').then($body3 => {
                if ($body3.find('[data-cy="btn-confirm-received"]').length > 0) {
                  exchangePage.confirmReceived(0)
                  cy.wait(500)
                  exchangePage.confirmDialogAction()
                  cy.wait(2000)

                  exchangePage.clickFilterReceived()
                  cy.wait(1000)

                  cy.get('body').then($body4 => {
                    if ($body4.find('[data-cy="btn-complete-exchange"]').length > 0) {
                      exchangePage.completeExchange(0)
                      cy.wait(500)
                      exchangePage.confirmDialogAction()
                      cy.wait(2000)

                      exchangePage.clickFilterCompleted()
                      cy.wait(1000)
                      cy.log('Troca gerenciada com sucesso do início ao fim')
                    }
                  })
                }
              })
            }
          })
        } else {
          cy.log('Nenhuma troca pendente encontrada para o fluxo completo')
        }
      })
    })
  })
})
