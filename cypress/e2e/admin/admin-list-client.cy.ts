import {AdminListClientPage} from '../../support/pages/admin-list-client-page';

describe("Admin List Client Management", () => {
  const adminListClientPage = new AdminListClientPage();

  beforeEach(() => {
    cy.visit('http://localhost:4200/admin/clientes')
  })

  it('Deve filtrar clientes por CPF', () => {
    adminListClientPage.fillCpf('12345678990')
    adminListClientPage.clickSearch()
    adminListClientPage.getClientTable().should('contain', '12345678990')
  })

  it('Deve filtrar clientes por E-mail', () => {
    adminListClientPage.fillEmail('marcospradodev@gmail.com')
    adminListClientPage.clickSearch()
    adminListClientPage.getClientTable().should('contain', 'marcospradodev@gmail.com')
  })

  it('Deve filtrar clientes por gênero masculino', () => {
    adminListClientPage.selectGenderMasc()
    adminListClientPage.clickSearch()
    adminListClientPage.getClientTable().should('contain', 'MASCULINO')
  })

  it('Deve filtrar clientes ativos', () => {
    adminListClientPage.selectStatusActive()
    adminListClientPage.clickSearch()
    adminListClientPage.getClientTable().should('contain', 'Ativo')
  })

  it('Deve desativar um cliente', () => {
    adminListClientPage.changeClientStatus(0)
    adminListClientPage.confirmDialogAction()
    adminListClientPage.getClientTable().should('contain', 'Inativo')
  })

  it('Deve filtrar clientes inativos', () => {
    adminListClientPage.selectStatusInactive()
    adminListClientPage.clickSearch()
    adminListClientPage.getClientTable().should('contain', 'Inativo')
  })

})
