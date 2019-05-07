describe("Log in", () =>{
    it("Login successfully", () =>{
        cy.visit("localhost:3000")
        cy.get('[data-cy=loginUsername').type('Mewkybar')
        cy.get('[data-cy=loginPassword').type('Mewnaja10')
    })
})