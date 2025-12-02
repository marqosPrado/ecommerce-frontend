import {AdminListClientPage} from '../../support/pages/admin-list-client-page';

describe("Admin List Client Management", () => {
  const adminListClientPage = new AdminListClientPage();

  const adminUser = {
    email: 'marcos.prado@example.com',
    password: 'Mklecono@123'
  }

  beforeEach(() => {
    cy.login(adminUser.email, adminUser.password)
    cy.visit('http://localhost:4200/admin/clientes')
  })

  it('Deve filtrar clientes por CPF', () => {
    adminListClientPage.fillCpf('53045688853')
    adminListClientPage.clickSearch()
    adminListClientPage.getClientTable().should('contain', '53045688853')
  })

  it('Deve filtrar clientes por E-mail', () => {
    adminListClientPage.fillEmail('sergio.benicio.bernardes@genesyslab.com')
    adminListClientPage.clickSearch()
    adminListClientPage.getClientTable().should('contain', 'sergio.benicio.bernardes@genesyslab.com')
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
