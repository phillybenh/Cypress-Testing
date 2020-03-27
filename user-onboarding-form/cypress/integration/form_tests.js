/// <reference types="Cypress" />


describe("Test form inputs and submittal", function () {
    beforeEach(function () {
        cy.visit("http://localhost:3000/");
    });

    it("Add tests for form inputs and submit button", function () {
        cy.get('input[name="name"]')
            .type("Jean-Luc Picard")
            .should("have.value", "Jean-Luc Picard");
        cy.get('input[name="email"]')
            .type("captPicard@galacyclassss.sft")
            .should("have.value", "captPicard@galacyclassss.sft");
        cy.get('input[name="pwd"]')
            .type("NCC-1701-D")
            .should("have.value", "NCC-1701-D");
        cy.get('[type="checkbox"]')
            .check()
            .should("be.checked");
        cy.get('button')
            .click()
    });

    it("Check form validation if input is left empty", function () {
        cy.get('input:invalid').should('have.length', 0)
       
        cy.get('input[name="name"]')
            .type("Jean-Luc Picard")
            .clear();
        cy.get("[data-cy=nameError]").should("be.visible");

        cy.get('input[name="email"]')
             .type("ben")
        cy.get("[data-cy=emailError]").should("be.visible");

        cy.get('input[name="pwd"]')
            .type("dfdf")
        cy.get("[data-cy=pwdError]").should("be.visible");

    })
});


// it('check validation message on invalid input', () => {
//     cy.get('input:invalid').should('have.length', 0)
//     cy.get('[type="email"]').type('not_an_email')
//     cy.get('[type="submit"]').click()
//     cy.get('input:invalid').should('have.length', 1)
//     cy.get('[type="email"]').then(($input) => {
//         expect($input[0].validationMessage).to.eq('I expect an email!')
//     })
// })
