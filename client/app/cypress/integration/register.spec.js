describe("Register Page", () => {
    beforeEach(function(){
        cy.visit("localhost:3000/signup")
    });

    it("Student register successfully", () => {
        cy.get('[data-cy=studentFormUsername]').type('Mewkybar')
        cy.get('[data-cy=studentFormEmail]').type('Mewloft@gmail.com')
        cy.get('[data-cy=studentFormFirstname]').type('Piyatat')
        cy.get('[data-cy=studentFormLastname]').type('Thainboonsong')
        cy.get('[data-cy=studentFormTelephone]').type('0951238551')
        cy.get('[data-cy=studentFormPassword]').type('Mewnaja10')
        cy.get('[data-cy=studentFormRe_password]').type('Mewnaja10')
        cy.get('[data-cy=studentFormRegister_btn]').click()
    });

    it("Tutor register successfully", () => {
        cy.get('button[class="sc-jzJRlG vZcgY"]').click()
        cy.get('[data-cy=tutorFormUsername]').type('PlengMath')
        cy.get('[data-cy=tutorFormEmail]').type('Plengcritical@gmail.com')
        cy.get('[data-cy=tutorFormFirstname]').type('Pongpanot')
        cy.get('[data-cy=tutorFormLastname]').type('Naubon')
        cy.get('[data-cy=tutorFormTelephone]').type('0965203349')
        cy.get('[data-cy=tutorFormPassword]').type('PlengEz1')
        cy.get('[data-cy=tutorFormRe_password]').type('PlengEz1')
        cy.get('select')
  .select('ปริญญาตรี').should('have.value', 'ปริญญาตรี')
        // cy.get('select[name="degree"]').select("ปริญญาตรี")
        
       
    });

    it("Student register with invalid password", () => {
        cy.get('[data-cy=studentFormUsername]').type('Mewkybar')
        cy.get('[data-cy=studentFormEmail]').type('Mewloft@gmail.com')
        cy.get('[data-cy=studentFormFirstname]').type('Piyatat')
        cy.get('[data-cy=studentFormLastname]').type('Thainboonsong')
        cy.get('[data-cy=studentFormTelephone]').type('0951238551')
        cy.get('[data-cy=studentFormPassword]').type('Mew')
        cy.get('[data-cy=studentFormRe_password]').type('Mew')
        cy.contains('รหัสผ่านไม่ถูกต้อง').should('not.be.visible')
        cy.get('[data-cy=studentFormRegister_btn]').click()
        cy.contains('รหัสผ่านไม่ถูกต้อง').should('be.visible')
    });

    it("Tutor register with invalid password", () => {
        cy.get('button[class="sc-jzJRlG vZcgY"]').click()
        cy.get('[data-cy=tutorFormUsername]').type('PlengMath')
        cy.get('[data-cy=tutorFormEmail]').type('Plengcritical@gmail.com')
        cy.get('[data-cy=tutorFormFirstname]').type('Pongpanot')
        cy.get('[data-cy=tutorFormLastname]').type('Naubon')
        cy.get('[data-cy=tutorFormTelephone]').type('0965203349')
        cy.get('[data-cy=tutorFormPassword]').type('Pleng')
        cy.get('[data-cy=tutorFormRe_password]').type('Pleng')
        cy.get('select')
  .select('ปริญญาตรี').should('have.value', 'ปริญญาตรี')
        cy.contains('รหัสผ่านไม่ถูกต้อง').should('not.be.visible')
        cy.get('[data-cy=tutorFormRegister_btn]').click()
        cy.contains('รหัสผ่านไม่ถูกต้อง').should('be.visible')


       
    });


  });