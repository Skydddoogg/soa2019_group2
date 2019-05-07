describe("Log in", () =>{
    beforeEach(function(){
        cy.visit("localhost:3000")
    })
    it("Login successfully", () =>{
        cy.get('[data-cy=loginUsername').type('Mewkybar')
        cy.get('[data-cy=loginPassword').type('Mewnaja10')
        cy.get('[data-cy=loginLogin_btn').click()
        cy.contains('กำลังเข้าสู่ระบบ...').should('be.visible')
    })
    it("Login failed", () =>{
        cy.get('[data-cy=loginUsername').type('MewMew')
        cy.get('[data-cy=loginPassword').type('Mew0')
        cy.get('[data-cy=loginLogin_btn').click()

    })

})