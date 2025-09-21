import {
  BasicClientDataStep,
  ClientAddressDataStep,
  ClientCreditCardDataStep,
  ClientRegisterPage
} from '../support/pages/client-register-page';

describe('Client registration test', () => {

  it('Should register a user with success', () => {
    cy.visit('http://localhost:4200/client/register')

    const clientRegisterPage = new ClientRegisterPage()

    const basicData: BasicClientDataStep = {
      fullName: "Marcos Vinicius Felix do Prado",
      cpf: '12345678990',
      gender: 'Masculino',
      birthDate: '15/04/2003',
      typePhoneNumber: 'Celular',
      phoneNumber: "11958889742",
      email: "marcospradodev@gmail.com",
      password: 'AbcT3ste@',
      confirmPassword: 'AbcT3ste@'
    }

    const clientAddress: ClientAddressDataStep = {
      typeResidence: 'Casa',
      typePlace: 'Rua',
      street: 'Rua Antônio Ruiz Veiga',
      number: '100',
      neighborhood: 'Mogilar',
      cep: '08773495',
      city: 'Mogi das Cruzes',
      stateId: 'São Paulo',
      country: 'Brasil',
      observations: 'Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum Loren ipsum'
    }

    const clientCreditCard: ClientCreditCardDataStep = {
      cardNumber: '4444444444444444',
      printedName: 'MARCOS V F PRADO',
      cardFlag: 'Visa',
      securityCode: '468'
    }
    clientRegisterPage.fillStep1(basicData)
    clientRegisterPage.fillAddressStep2(clientAddress)
    clientRegisterPage.fillCreditCardDataStep3(clientCreditCard)
  });
})
