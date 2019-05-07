describe("User flow", () =>{
    
    it("User login to filter a post", () =>{
        cy.visit("localhost:3000")
        cy.get('[data-cy=loginUsername').type('Mewkybar')
        cy.get('[data-cy=loginPassword').type('Mewnaja10')
        cy.get('[data-cy=loginLogin_btn').click()
        cy.contains('กำลังเข้าสู่ระบบ...').should('be.visible')
        cy.wait(500)
        cy.get('[data-cy=navLogin_btn').click()


        cy.get('div[class="ais-RefinementList"]').eq(1).then(($li) =>{
            cy.wrap($li).get('li > label > input').first().check()
            })

            
        cy.get('input[class="ais-RangeInput-input ais-RangeInput-input--min"]').type(500)
        cy.get('input[class="ais-RangeInput-input ais-RangeInput-input--max"]').type(700)
        cy.contains('ok').click()
        cy.get('[data-cy=searchHitObject]').should('have.length', 1)
        cy.get('[data-cy=searchHitObject] > div[class="product-name"] ').first().click()
        


    })
    it("User login to create a post ", () =>{
        cy.visit("localhost:3000")
        cy.get('[data-cy=loginUsername').type('Mewkybar')
        cy.get('[data-cy=loginPassword').type('Mewnaja10')
        cy.get('[data-cy=loginLogin_btn').click()
        cy.contains('กำลังเข้าสู่ระบบ...').should('be.visible')
        cy.wait(500)
        cy.get('[data-cy=navLogin_btn').click()
        cy.get('[data-cy=navCreatePost').click()
        cy.get('[data-cy=postSubject]').select('เคมี')
        cy.get('[data-cy=postLevel]').select('มัธยมปลาย')
        cy.get('[data-cy=postStartTime]').type('16:00')
        cy.get('[data-cy=postEndTime]').type('18:00')
        cy.get('[data-cy=postLocation]').type('Siam square one')
        cy.get('[data-cy=postExpectPrice]').type(250)   
        cy.get('[data-cy=postSubmit_btn]').click()
        cy.wait(500)
        cy.get('[data-cy=navFindTutor]').click()

    })
    it("User login to see offers", () =>{
        cy.visit("localhost:3000")
        cy.get('[data-cy=loginUsername').type('Mewkybar')
        cy.get('[data-cy=loginPassword').type('Mewnaja10')
        cy.get('[data-cy=loginLogin_btn').click()
        cy.contains('กำลังเข้าสู่ระบบ...').should('be.visible')
        cy.wait(500)

        cy.get('[data-cy=navLogin_btn').click()
        cy.wait(500)

        cy.get('[data-cy=navOffer]').click()

    })
    

})