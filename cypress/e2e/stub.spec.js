/// <reference types='cypress' />

describe('test suite - stub', () => {
    it('test - stub window.alert', () => {
        cy.visit('window-alert.html', {
            onBeforeLoad: () => {
                cy.window().then(win => cy.stub(win, 'alert').as('stubWinAlert'))
            }
        })
        cy.get('#clickme').click()
        cy.get('@stubWinAlert').should('be.calledOnceWith', 'This is a window alert')
    })
    it('test - stub window.open', () => {
        cy.visit('window-open.html', {
            onBeforeLoad: () => {
                cy.window().then(win => cy.stub(win, 'open').as('stubWinOpen'))
            }
        })
        cy.get('#clickme').click()
        cy.get('@stubWinOpen').should('be.calledOnceWith', 'https://www.google.com')
    })
    context('test stub window.prompt', () => {
        beforeEach(() => {
            cy.visit('window-prompt.html')
        })
        it('test - stub with a value', () => {
            const value = 'jean'
            cy.window().then(win => cy.stub(win, 'prompt').returns(value).as('stubWinPromptReturnsValue'))
            cy.get('#clickme').click()
            cy.get('@stubWinPromptReturnsValue').should('be.calledOnceWith', 'Please enter a value')
            cy.get('#result').should('have.text', `Input value: ${value}`)
        })
        it('test - stub with null value', () => {
            cy.window().then(win => cy.stub(win, 'prompt').returns(null).as('stubWinPromptReturnsNull'))
            cy.get('#clickme').click()
            cy.get('@stubWinPromptReturnsNull').should('be.calledOnceWith', 'Please enter a value')
            cy.get('#result').should('have.text', 'No input entered')
        })
    })
    context('test - stub window.confirm', () => {
        beforeEach(() => {
            cy.visit('window-confirm.html')
        })
        it('test - stub with confirm input', () => {
            cy.window().then(win => {
                cy.stub(win, 'confirm').returns(true).as('stubWinConfirmReturnsTrue')
            })
            cy.get('#clickme').click()
            cy.get('@stubWinConfirmReturnsTrue').should('be.calledOnce')
            cy.get('#result').should('have.text', 'You have clicked Confirm')
        })
        it('test - stub with cancel input', () => {
            cy.window().then(win => {
                cy.stub(win, 'confirm').as('stubWinConfirmReturnsFalse')
            })
            cy.get('#clickme').click()
            cy.get('@stubWinConfirmReturnsFalse').should('be.calledOnce')
            cy.get('#result').should('have.text', 'You have clicked Cancel')
        })
    })
})