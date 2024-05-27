Feature: Histórico de pedidos
    As a cliente
    I want to ver minha lista de histórico de pedidos
    So that eu possa acompanhar meus pedidos anteriores, repetir pedidos facilmente e monitorar meus gastos e preferências.

Scenario: Acessar página de histórico de pedidos sem haver pedidos feitos no aplicativo
    Given que eu estou logado como “cliente” com o login “usuario_qualquer1” 
    And eu estou na página “home”
    And o sistema não possui nenhum pedido associado a meu perfil
    When eu escolho a opção “Pedidos”
    Then eu vejo uma mensagem “não há detalhes de pedidos para o seu perfil”
    And eu continuo na página “home”

Scenario: Acessar página de histórico de pedidos com pedidos feitos no aplicativo
    Given que eu estou logado como “cliente” com o login “usuario_qualquer2” 
    And eu estou na página “home”
    And o sistema tem registrado, associado a meu perfil,  o pedido “3091” o pedido “4001”
    When eu escolho a opção “Pedidos”
    Then eu estou na página “Histórico de pedidos”
    And eu consigo visualizar a lista de pedidos ordenados de mais recente para mais antigo

Scenario: Acessar restaurante através de pedido do histórico
    Given que eu estou logado como “cliente” com o login “usuario_qualquer1” 
    And eu estou na página “Histórico de pedidos”
    And o sistema tem registrado, associado a meu perfil,  o pedido de número “3071” com o item “Pizza”, restaurante "Pizzaria Italiana"
    valor “59,90”, status “entregue”, data “11/05/2024” e o pedido de número “3081” com o item “Hamburguer”, restaurante "Hamburgueria legal"
    valor “39,90”, status “entregue”, data “05/05/2024”
    When eu clico no nome “pizzaria italiana” no primeiro pedido da lista do histórico
    Then eu estou na página “perfil do restaurante” do restaurante “Pizzaria Italiana”

Scenario: Acessar item através de pedido do histórico
    Given que eu estou na página “Histórico de pedidos”
    And o sistema tem registrado, associado a meu perfil,  o pedido de número “3071” com o item “Pizza”, restaurante "Pizzaria Italiana"
    valor “59,90”, status “entregue”, data “11/05/2024” e o pedido de número “3081” com o item “Hamburguer”, restaurante "Hamburgueria legal"
    valor “39,90”, status “entregue”, data “05/05/2024”
    When eu clico no item “Hamburgueria” no primeiro pedido da lista do histórico
    Then eu estou na página “Cardápio” do restaurante “Hamburgueria legal”
    And eu vejo o item “Hamburguer”