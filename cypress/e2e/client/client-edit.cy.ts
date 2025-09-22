import { ClientUpdatePage } from '../../support/pages/client-update-page';
import { AdminListClientPage } from '../../support/pages/admin-list-client-page';

describe('Tela de Edição de usuário', () => {
  const clientEditPage = new ClientUpdatePage();
  const adminListClientPage = new AdminListClientPage();

  beforeEach(() => {
    cy.visit('http://localhost:4200/client/edit/1');
  });

  it('Deve atualizar o nome do cliente', () => {
    const newName = 'Marcos Prado';

    clientEditPage.changeName(newName);
    clientEditPage.clickBtnToUpdate();
    clientEditPage.confirmChange();

    cy.visit('http://localhost:4200/admin/clientes');

    adminListClientPage.fillName(newName);
    adminListClientPage.clickSearch();
    adminListClientPage.getClientTable()
      .should('be.visible')
      .and('contain', newName);
  });

  it('Deve atualizar o telefone do cliente', () => {
    const newPhone = '11999999999';

    clientEditPage.changePhoneNumber(newPhone);
    clientEditPage.clickBtnToUpdate();
    clientEditPage.confirmChange();

    cy.visit('http://localhost:4200/admin/clientes');

    adminListClientPage.fillPhone(newPhone);
    adminListClientPage.clickSearch();
    adminListClientPage.getClientTable()
      .should('be.visible')
      .and('contain', newPhone);
  });

});
