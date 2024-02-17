Feature: History Service

# Service
Scenario: Obter histórico de um usuário por id
    Given o método getUserHistory chamado com "1" do HistoryService retorna um histórico com "3" itens com song_id "1", "2" e "3"
    When o método getUserHistory do HistoryService for chamado com o id "1"
    Then o histórico retornado deve ter "3" itens com song_id "1", "2" e "3"