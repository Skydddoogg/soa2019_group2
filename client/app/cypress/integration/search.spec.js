describe("Search page", () =>{
    beforeEach(function(){
        cy.visit("localhost:3000/search")
    });

    it("Filter by subject", () =>{
        cy.get('input[class="ais-RefinementList-checkbox"]').first().check()
        cy.contains('ok').click()
    
            // cy.get('[data-cy=searchHitObject] > div[class="product-name"] > span > span').each(($li) =>{
            //     cy.wrap($li).invoke('text').should('include', 'math')
            // })
    
        cy.get('[data-cy=searchHitObject]').should('have.length', 7)
    //     cy.get('[data-cy=searchSubject]').each(($li) =>{
    //         cy.wrap($li).click()
    // });
    })

    it("Filter by level", () =>{
        cy.get('div[class="ais-RefinementList"]').eq(1).then(($li) =>{
            cy.wrap($li).get('li > label > input').first().check()
        })


    })

    it("Filter by price", () =>{
        cy.get('input[class="ais-RangeInput-input ais-RangeInput-input--min"]').type(500)
        cy.get('input[class="ais-RangeInput-input ais-RangeInput-input--max"]').type(700)
        cy.contains('ok').click()
        cy.get('[data-cy=searchHitObject]').should('have.length', 1)

    })

    it("Select a tutor session", () =>{
        cy.get('[data-cy=searchHitObject] > div[class="product-name"] ').first().click()
    })
    
})
