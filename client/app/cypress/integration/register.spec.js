describe("Register Page", () => {
    beforeEach(function(){
        cy.visit("localhost:3000/signup")
    });

    it("Student register successfully", () => {
        cy.get('[data-cy=username]').type('Mewkybar')
        cy.get('[data-cy=email]').type('Mewloft@gmail.com')
        cy.get('[data-cy=firstname]').type('Piyatat')
        cy.get('[data-cy=lastname]').type('Thainboonsong')
        cy.get('[data-cy=telephone]').type('0951238551')
        cy.get('[data-cy=password]').type('Mewnaja10')
        cy.get('[data-cy=re_password]').type('Mewnaja10')
        cy.get('[data-cy=register_btn]').click()
    });

    it("Tutor register successfully", () => {
       
    });

    it("Student register with wrong password", () => {
        cy.get('[data-cy=username]').type('Mewkybar')
        cy.get('[data-cy=email]').type('Mewloft@gmail.com')
        cy.get('[data-cy=firstname]').type('Piyatat')
        cy.get('[data-cy=lastname]').type('Thainboonsong')
        cy.get('[data-cy=telephone]').type('0951238551')
        cy.get('[data-cy=password]').type('Mew')
        cy.get('[data-cy=re_password]').type('Mew')


        cy.contains('รหัสผ่านไม่ถูกต้อง').should('not.be.visible')
        cy.get('[data-cy=register_btn]').click()
        cy.contains('รหัสผ่านไม่ถูกต้อง').should('be.visible')

       
    });

    // it("", () => {
       
    // });


  });