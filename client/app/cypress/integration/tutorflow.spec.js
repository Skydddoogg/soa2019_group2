describe("Tutor flow", () =>{
    
    it("Tutor login to offer ", () =>{
        cy.visit("localhost:3000")
        cy.get('[data-cy=loginUsername').type('Saiparn')
        cy.get('[data-cy=loginPassword').type('Saiparn1')
        cy.get('[data-cy=loginLogin_btn').click()
        cy.contains('กำลังเข้าสู่ระบบ...').should('be.visible')
        cy.wait(500)
        cy.get('[data-cy=navLogin_btn').click()


    })
    it("", () =>{
   
    })
    

})