describe("Search page", () =>{
    beforeEach(function(){
        cy.visit("localhost:3000/search")
    });

    it("Filter by subject", () =>{
        cy.get('input[class="ais-RefinementList-checkbox"]').first().check()
        cy.contains('ok').click()
        cy.get('[data-cy=searchHitObject] > .product-name > span > span').each(($span) =>{
            cy.wrap($span).invoke('text').should('eq', 'Math')
        })
        cy.get('[data-cy=searchHitObject]').should('have.length', 5)
    //     cy.get('[data-cy=searchSubject]').each(($li) =>{
    //         cy.wrap($li).click()
    // });
    })

    it("Filter by level", () =>{

    })

    it.only("Select a tutor session", () =>{
        cy.get('[data-cy=searchHitObject] > div[class="product-name"] > span > span').each(($div) =>{
            cy.wrap($div).first().invoke('text').should('eq', 'Japanese')
    })
    })
})
