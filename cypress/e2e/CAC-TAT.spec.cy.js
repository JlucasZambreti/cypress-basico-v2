///<reference types="Cypress" />


describe('Central de atendimento ao cliente TAT', () => {
  beforeEach(() => {
    cy.visit('../../src/index.html')
  })

  it('verifica o titulo da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche Formulario e envia', () => {
    cy.get('#firstName')
      .type("João Lucas")
    cy.get('#lastName')
      .type("Abdala Zambreti")
    cy.get('#email')
     .type("teste@teste.com")
    cy.get('#open-text-area')
      .type("Apenas para teste. Igaaaaaore!",{delay: 0})
    cy.get('button[type="submit"]')
      .click()
    cy.get('[class=success]')
      .should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#email')
    .type("teste")
    cy.get('button[type="submit"]')
    .click()
    cy.get('[class=error]')
    .should('be.visible')
  })

  it('Verifica campo de telefone', () => {
    cy.get('#phone')
    .type('testo para testew')
    .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
  cy.get('#firstName')
    .type("João Lucas")
  cy.get('#lastName')
    .type("Abdala Zambreti")
  cy.get('#email')
   .type("teste@teste.com")
  cy.get('#open-text-area')
    .type("Apenas para teste. Igaaaaaore!",{delay: 0})
  cy.get('#phone-checkbox')
    .check()
  cy.get('button[type="submit"]')
    .click()
  cy.get('[class=error]')
    .should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () =>{

    //preenche
    cy.get('#firstName')
       .type("João Lucas")
       .should('have.value', 'João Lucas')
    cy.get('#lastName')
      .type("Abdala Zambreti")
      .should('have.value', 'Abdala Zambreti')
    cy.get('#email')
      .type("teste@teste.com")
      .should('have.value', 'teste@teste.com')

    //limpa
    cy.get('#firstName')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
       .clear()
      .should('have.value', '')
    cy.get('#email')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('Enviar')
    .click()
    cy.get('[class=error]')
    .should('be.visible')
  })


  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('[class=success]')
      .should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value','youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)',() => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value','mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value','blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"][name="atendimento-tat"]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .should('have.length', 2)
      .each(function($checkbox){
        cy.wrap($checkbox).check()
        cy.wrap($checkbox).should('be.checked')
      })
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[id="file-upload"][type="file"]')
    .selectFile('cypress/fixtures/example.json')
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[id="file-upload"][type="file"]')
    .selectFile('cypress/fixtures/example.json', { action:'drag-drop' })
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })   
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('simpleFile')
    cy.get('input[id="file-upload"][type="file"]')
      .selectFile('@simpleFile')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })   
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
      cy.contains('Talking About Testing')
      .should('be.visible')
  })
})