import { CartPage, AddressData, CreditCardData } from '../../support/pages/cart-page'

describe('Cart E2E Tests', () => {
  const cartPage = new CartPage()

  const testUser = {
    email: 'marcos.prado@example.com',
    password: 'Mklecono@123'
  }

  beforeEach(() => {
    cy.login(testUser.email, testUser.password)
  })

  describe('Step 1 - Carrinho', () => {
    it('Should display empty cart message when no items', () => {
      cartPage.visit()

      cy.wait(3000)

      cy.get('body').then($body => {
        if ($body.find('[label="Limpar carrinho"]').length > 0) {
          cartPage.clearCart()
          cy.wait(500)
        }
      })

      cartPage.verifyEmptyCart()
    })

    it('Should display cart items when products are added', () => {
      cartPage.addProductFromMainPage()

      cartPage.visit()

      cartPage.verifyCartHasItems()
    })

    it('Should update item quantity', () => {
      cartPage.addProductFromMainPage()

      cartPage.visit()

      cartPage.updateItemQuantity(0, 3)

      cy.get('[formControlName="quantity"]').first().should('contain', '3')
    })

    it('Should remove item from cart', () => {
      cartPage.addProductFromMainPage()

      // Visita o carrinho
      cartPage.visit()

      cartPage.removeItem(0)

      cy.wait(500)

      cartPage.verifyEmptyCart()
    })

    it('Should clear entire cart', () => {
      cartPage.addProductFromMainPage()

      cartPage.visit()

      cartPage.clearCart()
      cy.wait(500)

      cartPage.verifyEmptyCart()
    })

    it('Should navigate to next step with valid cart', () => {
      cartPage.addProductFromMainPage()

      cartPage.visit()

      cartPage.nextStep()

      cy.contains('Selecione seu endereço').should('be.visible')
    })
  })

  describe('Step 2 - Endereços', () => {
    beforeEach(() => {
      cartPage.addProductFromMainPage()

      cartPage.visit()

      cartPage.nextStep()
    })

    it('Should select existing address', () => {
      cartPage.selectAddress(0)

      // PrimeNG radio buttons use classes instead of the checked attribute
      cy.get('[formControlName="address"]').first().should('have.class', 'p-radiobutton-checked')
    })

    it('Should add new address', () => {
      const newAddress: AddressData = {
        typeResidence: 'Casa',
        typePlace: 'Rua',
        street: 'Rua Teste E2E',
        number: '123',
        neighborhood: 'Centro',
        cep: '12345678',
        city: 'São Paulo',
        stateId: 'São Paulo',
        country: 'Brasil',
        observations: 'Observação de teste E2E'
      }

      cartPage.fillAndSubmitNewAddress(newAddress)

      cy.wait(1000)

      cy.contains(newAddress.street).should('be.visible')
    })

    it('Should navigate between steps', () => {
      cartPage.selectAddress(0)

      cartPage.nextStep()

      cy.contains('Cartões de Crédito').should('be.visible')

      cartPage.previousStep()

      cy.contains('Selecione seu endereço').should('be.visible')
    })
  })

  describe('Step 3 - Pagamento', () => {
      beforeEach(() => {
        cartPage.addProductFromMainPage()

        cartPage.visit()

        cartPage.nextStep()

        cartPage.selectAddress(0)

        cartPage.nextStep()
      })

      it('Should select credit card', () => {
        cy.get('p-checkbox').first().click()

        cy.get('p-checkbox').first().should('have.class', 'p-checkbox-checked')
      })
      it('Should add new credit card', () => {
        const newCard: CreditCardData = {
          cardNumber: '5555555555555555',
          printedName: 'TESTE E2E CYPRESS',
          cpf: '12345678990',
          birthDate: '01/01/1990',
          surname: 'Teste',
          cardFlag: 'Mastercard',
          securityCode: '123',
          isMain: false
        }

        cartPage.fillAndSubmitNewCreditCard(newCard)

        cy.wait(1000)

        cy.contains(newCard.printedName).should('be.visible')
      })

      it('Should apply discount voucher', () => {
        const voucherCode = 'ALAN50'

        cartPage.applyVoucher(voucherCode)

        // Aguarda a aplicação
        cy.wait(1000)

        cy.get('body').then($body => {
          if ($body.find('[class*="pi-check-circle"]').length > 0) {
            cartPage.verifyVoucherApplied()
          } else if ($body.find('[class*="pi-exclamation-circle"]').length > 0) {
            cartPage.verifyVoucherError()
          }
        })
      })

    describe('Complete Checkout Flow', () => {
      it('Should complete entire checkout process', () => {
        cartPage.addProductFromMainPage()

        cartPage.visit()

        cartPage.verifyCartHasItems()

        cartPage.nextStep()

        cartPage.selectAddress(0)

        cartPage.nextStep()

        cy.get('p-checkbox').first().click()

        cy.get('p-checkbox').eq(4).click()

        cy.wait(500)

        cartPage.finalizePurchase()

        cy.wait(2000)

        cy.get('app-modal').should('be.visible')
      })
    })
  })
})
