describe("Post page", () =>{
    beforeEach(function(){
    });
    it("Add new post", () =>{
        cy.visit("localhost:3000/post")

        cy.get('[data-cy=postSubject]').select('ภาษาไทย')
        cy.get('[data-cy=postLevel]').select('มัธยมปลาย')
        cy.get('[data-cy=postStartTime]').type('16:00')
        cy.get('[data-cy=postEndTime]').type('18:00')
        cy.get('[data-cy=postLocation]').type('Siam square one')
        cy.get('[data-cy=postExpectPrice]').type(300)   
        cy.get('[data-cy=postSubmit_btn]').click()

    });
    it.only("Filter posts by subject", () => {
        cy.visit("localhost:3000/search")
        cy.wait(3000)
        cy.get('[data-cy=searchHitObject]').each(($div) =>{
                cy.wrap($div).click()
            
        })
    })


});