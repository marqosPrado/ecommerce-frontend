import { ClientUpdatePage } from '../../support/pages/client-update-page';
import { AdminListClientPage } from '../../support/pages/admin-list-client-page';

describe('Tela de Edição de usuário', () => {
  const clientEditPage = new ClientUpdatePage();
  const adminListClientPage = new AdminListClientPage();

  const testUser = {
    email: 'sergio.benicio.bernardes@genesyslab.com',
    password: '1234'
  }

  beforeEach(() => {
    cy.login(testUser.email, testUser.password);
    cy.visit('http://localhost:4200/minha-conta');
    cy.get('[data-cy="edit-client-button"]').click()
  });

  it('Deve atualizar o nome do cliente', () => {
    const newName = 'Marcos Prado';

    clientEditPage.changeName(newName);
    clientEditPage.clickBtnToUpdate();
    clientEditPage.confirmChange();

  });

  it('Deve atualizar o telefone do cliente', () => {
    const newPhone = '11999999999';

    clientEditPage.changePhoneNumber(newPhone);
    clientEditPage.clickBtnToUpdate();
    clientEditPage.confirmChange();

  });

});
