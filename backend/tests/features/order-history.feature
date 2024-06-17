Feature: Historico de pedidos

# Service
Scenario: Usuario com pedidos
    Given o usuário de id "1" está registrado no sistema
    And o usuário possui um pedido de id "101"
    When é feita uma requisição para obter os pedidos do usuário
    Then a resposta deve conter o pedido com id "101"

Scenario: Usuario sem pedidos
    Given o usuário de id "2" está registrado no sistema
    And o usuário não possui pedidos
    When é feita uma requisição para obter os pedidos do usuário
    Then a mensagem "não há pedidos registrados para o perfil" deve ser retornada
