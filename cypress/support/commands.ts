/// <reference types="cypress" />

/**
 * Custom command to perform login
 * @example cy.login('user@example.com', 'password123')
 */
Cypress.Commands.add('login', (email: string, password: string) => {
  // Usa cy.session para preservar o login entre os testes
  cy.session([email, password], () => {
    cy.visit('http://localhost:4200/login')

    cy.get('#email').type(email)
    cy.get('#password').type(password)

    cy.get('[class*="login-button"]').click()

    // Aguarda o redirecionamento após login bem-sucedido
    cy.url().should('not.include', '/login')

    // Aguarda um pouco para garantir que o token foi armazenado
    cy.wait(1000)
  })
})

/**
 * Custom command to perform API login and set token in localStorage
 * This is faster than UI login for tests that don't need to validate the login flow
 * @example cy.apiLogin('user@example.com', 'password123')
 */
Cypress.Commands.add('apiLogin', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8080/api/auth/login',
    body: {
      email,
      password
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body).to.have.property('data')
    expect(response.body.data).to.have.property('token')

    // Armazena o token no localStorage
    const token = response.body.data.token
    const user = response.body.data.user

    cy.window().then((window) => {
      window.localStorage.setItem('authToken', token)
      window.localStorage.setItem('user', JSON.stringify(user))
    })
  })
})

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to perform login via UI
       * @param email - User email
       * @param password - User password
       * @example cy.login('user@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>

      /**
       * Custom command to perform login via API (faster)
       * @param email - User email
       * @param password - User password
       * @example cy.apiLogin('user@example.com', 'password123')
       */
      apiLogin(email: string, password: string): Chainable<void>
    }
  }
}
