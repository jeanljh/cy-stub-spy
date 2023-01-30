/// <reference types='cypress' />

describe('test suite - spy', () => {
    it('test - spy window.alert', () => {
        cy.visit('window-alert.html', {
            onBeforeLoad: () => {
                cy.window().then(win => cy.spy(win, 'alert').as('spyWinAlert'))
            }
        })
        Cypress.on('window:alert', () => true)
        cy.get('#clickme').click()
        cy.get('@spyWinAlert').should('have.been.calledOnceWith', 'This is a window alert')
    })
    context('test - spy window.confirm', () => {
        beforeEach(() => {
            cy.visit('window-confirm.html')
        })
        it('test - spy with confirm input', () => {
            cy.window().then(win => {
                cy.spy(win, 'confirm').as('spyWinConfirm')
            })
            Cypress.on('window:confirm', () => true)
            cy.get('#clickme').click()
            cy.get('@spyWinConfirm').should('have.been.calledOnce')
            cy.get('#result').should('have.text', 'You have clicked Confirm')
        })
        it('test - spy with cancel input', () => {
            cy.window().then(win => {
                cy.spy(win, 'confirm').as('spyWinConfirm')
            })
            Cypress.on('window:confirm', () => false)
            cy.get('#clickme').click()
            cy.get('@spyWinConfirm').should('have.been.calledOnce')
            cy.get('#result').should('have.text', 'You have clicked Cancel')
        })
    })
})