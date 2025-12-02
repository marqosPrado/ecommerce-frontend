import { cartSelectors as selector } from '../selectors/cart-selectors'

export interface AddressData {
  typeResidence: string
  typePlace: string
  street: string
  number: string
  neighborhood: string
  cep: string
  city: string
  stateId: string
  country: string
  observations?: string
}

export interface CreditCardData {
  cardNumber: string
  printedName: string
  cpf: string
  birthDate: string
  surname: string
  cardFlag: string
  securityCode: string
  isMain?: boolean
}

export class CartPage {
  /**
   * Visita a página do carrinho
   */
  visit(): void {
    cy.visit('http://localhost:4200/carrinho')
    // Aguarda a página carregar completamente
    cy.wait(1000)
  }

  /**
   * Adiciona um produto ao carrinho a partir da página principal
   * @param productIndex - Índice do produto a ser adicionado (padrão: 0)
   */
  addProductFromMainPage(productIndex: number = 0): void {
    cy.visit('http://localhost:4200', { timeout: 10000 })

    cy.scrollTo(0, 500)

    cy.wait(2000)

    cy.visit('http://localhost:4200/produto/18')

    cy.url({ timeout: 10000 }).should('include', '/produto/')

    cy.wait(1000)

    cy.get('[data-cy="comprar-agora-button"]').click()

    cy.wait(1500)
  }

  /**
   * Verifica se o carrinho está vazio
   */
  verifyEmptyCart(): void {
    cy.get(selector.emptyCartMessage).should('be.visible')
  }

  /**
   * Verifica se há itens no carrinho
   */
  verifyCartHasItems(): void {
    cy.get(selector.cartItemsContainer).should('have.length.greaterThan', 0)
  }

  /**
   * Atualiza a quantidade de um item no carrinho
   * @param itemIndex - Índice do item (começando em 0)
   * @param quantity - Nova quantidade
   */
  updateItemQuantity(itemIndex: number, quantity: number): void {
    // Clica no select para abrir o dropdown
    cy.get(selector.quantitySelect)
      .eq(itemIndex)
      .click()

    // Aguarda o dropdown aparecer e seleciona a opção
    // O dropdown é anexado ao body, então precisamos buscar fora do select
    cy.get('.p-select-overlay')
      .should('be.visible')
      .contains('.p-select-option', quantity.toString())
      .click()
  }

  /**
   * Remove um item do carrinho
   * @param itemIndex - Índice do item (começando em 0)
   */
  removeItem(itemIndex: number): void {
    cy.get(selector.removeItemButton).eq(itemIndex).click()
  }

  /**
   * Limpa todo o carrinho
   */
  clearCart(): void {
    cy.get(selector.clearCartButton).click()
  }

  /**
   * Avança para o próximo passo
   */
  nextStep(): void {
    // Aguarda um pouco para garantir que o formulário foi validado
    cy.wait(500)

    cy.get('[data-cy="checkout-button"]').click()
  }

  /**
   * Volta para o passo anterior
   */
  previousStep(): void {
    cy.get(selector.previousStepButton).click()
  }

  /**
   * Seleciona um endereço existente
   * @param addressIndex - Índice do endereço (começando em 0)
   */
  selectAddress(addressIndex: number): void {
    cy.get(selector.addressRadioButton).eq(addressIndex).click()
  }

  /**
   * Abre o formulário de novo endereço
   */
  openNewAddressForm(): void {
    cy.get('[data-cy="novo-endereco-button"]').click()
  }

  /**
   * Preenche e cadastra um novo endereço
   * @param data - Dados do endereço
   */
  fillAndSubmitNewAddress(data: AddressData): void {
    this.openNewAddressForm()

    cy.get(selector.typeResidenceSelect).click()
    cy.get('.p-select-overlay').should('be.visible').contains('.p-select-option', data.typeResidence).click()

    cy.get(selector.typePlaceSelect).click()
    cy.get('.p-select-overlay').should('be.visible').contains('.p-select-option', data.typePlace).click()

    cy.get(selector.streetInput).type(data.street)
    cy.get(selector.numberInput).type(data.number)
    cy.get(selector.neighborhoodInput).type(data.neighborhood)
    cy.get(selector.cepInput).type(data.cep)
    cy.get(selector.cityInput).type(data.city)

    cy.get(selector.stateSelect).click()
    cy.get('.p-select-overlay').should('be.visible').contains('.p-select-option', data.stateId).click()

    cy.get(selector.countryInput).clear().type(data.country)

    if (data.observations) {
      cy.get(selector.observationsTextarea).type(data.observations)
    }

    cy.get('[data-cy="cadastrar-novo-endereco-cart"]').click()
  }

  /**
   * Seleciona um cupom de troca
   * @param voucherIndex - Índice do cupom (começando em 0)
   */
  selectExchangeVoucher(voucherIndex: number): void {
    cy.get(selector.voucherCheckbox).eq(voucherIndex).click()
  }

  /**
   * Seleciona um cartão de crédito
   * @param cardIndex - Índice do cartão (começando em 0)
   */
  selectCreditCard(cardIndex: number): void {
    cy.get(selector.creditCardCheckbox).eq(cardIndex).click()
  }

  /**
   * Seleciona o número de parcelas
   * @param installments - Número de parcelas
   */
  selectInstallments(installments: string): void {
    cy.get(selector.installmentsSelect).click()
    cy.get('.p-select-overlay')
      .should('be.visible')
      .contains('.p-select-option', `${installments}x sem juros`)
      .click()
  }

  /**
   * Abre o formulário de novo cartão de crédito
   */
  openNewCreditCardForm(): void {
    cy.get(selector.newCreditCardButton).click()
  }

  /**
   * Preenche e cadastra um novo cartão de crédito
   * @param data - Dados do cartão
   */
  fillAndSubmitNewCreditCard(data: CreditCardData): void {
    this.openNewCreditCardForm()

    cy.get(selector.cardNumberInput).type(data.cardNumber)
    cy.get(selector.printedNameInput).type(data.printedName)
    cy.get(selector.cpfInput).type(data.cpf)
    cy.get(selector.birthDateInput).type(data.birthDate)
    cy.get(selector.surnameInput).type(data.surname)

    cy.get(selector.cardFlagSelect).click()
    cy.get('.p-select-overlay').should('be.visible').contains('.p-select-option', data.cardFlag).click()

    cy.get(selector.securityCodeInput).type(data.securityCode)

    if (data.isMain) {
      cy.get(selector.isMainCheckbox).click()
    }

    cy.get(selector.registerCreditCardButton).click()
  }

  /**
   * Aplica um cupom de desconto
   * @param code - Código do cupom
   */
  applyVoucher(code: string): void {
    cy.get(selector.voucherCodeInput).type(code)
    cy.get(selector.applyVoucherButton).click()
  }

  /**
   * Verifica se o cupom foi aplicado com sucesso
   */
  verifyVoucherApplied(): void {
    cy.get(selector.voucherAppliedMessage).should('be.visible')
  }

  /**
   * Verifica se há erro ao aplicar cupom
   */
  verifyVoucherError(): void {
    cy.get(selector.voucherErrorMessage).should('be.visible')
  }

  /**
   * Remove o cupom de desconto aplicado
   */
  removeVoucher(): void {
    cy.get(selector.removeVoucherButton).click()
  }

  /**
   * Finaliza a compra
   */
  finalizePurchase(): void {
    this.nextStep()
  }

  /**
   * Verifica se a modal de sucesso é exibida
   */
  verifySuccessModal(): void {
    cy.get(selector.modal).should('be.visible')
    cy.get(selector.modalTitle).should('contain', 'Sucesso')
  }

  /**
   * Verifica se a modal de erro é exibida
   */
  verifyErrorModal(): void {
    cy.get(selector.modal).should('be.visible')
    cy.get(selector.modalTitle).should('contain', 'Erro')
  }

  /**
   * Verifica se o botão de login está visível (usuário não autenticado)
   */
  verifyLoginButtonVisible(): void {
    cy.get(selector.loginButton).should('be.visible')
  }

  /**
   * Verifica se o alerta de cartão obrigatório está visível
   */
  verifyRequiresCreditCardAlert(): void {
    cy.get(selector.requiresCreditCardAlert).should('be.visible')
  }

  /**
   * Verifica se o alerta de cupons cobrindo total está visível
   */
  verifyVouchersCoverTotalAlert(): void {
    cy.get(selector.vouchersCoverTotalAlert).should('be.visible')
  }

  /**
   * Fluxo completo: adiciona itens ao carrinho, seleciona endereço e finaliza
   * @param addressIndex - Índice do endereço a selecionar
   * @param cardIndex - Índice do cartão a selecionar
   */
  completeCheckoutFlow(addressIndex: number = 0, cardIndex: number = 0): void {
    // Step 1: Verificar itens e avançar
    this.verifyCartHasItems()
    this.nextStep()

    // Step 2: Selecionar endereço e avançar
    this.selectAddress(addressIndex)
    this.nextStep()

    // Step 3: Selecionar cartão e finalizar
    this.selectCreditCard(cardIndex)
    this.finalizePurchase()

    // Verificar sucesso
    this.verifySuccessModal()
  }
}
