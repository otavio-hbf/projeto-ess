Feature: Hot

Scenario: Ordenar top músicas em ordem decrescente de vezes já tocadas
Given as músicas de id "1", "2", "3", "4", "5" estão cadastradas
And suas respectivas quantidades de vezes já tocadas é "1", "2", "3", "4", "5"
When o método getHotSongs é chamado
Then os ids das músicas no ranking do primeiro ao quinto colocado são, respectivamente, "5", "4", "3", "2", "1"

Scenario: Filtrar top músicas por gênero
Given as músicas de id "1", "2", "3", "4", "5" estão cadastradas com gênero "MPB"
And suas respectivas quantidades de vezes já tocadas é "1", "2", "3", "4", "5"
When o método getHotSongs é chamado com o gênero "MPB"
Then os ids das músicas no ranking do gênero MPB do primeiro ao quinto colocado são, respectivamente, "5", "4", "3", "2", "1"

Scenario: Critério de desempate
Given as músicas de id "1", "2", "3", "4", "5", "6" estão cadastradas
And suas respectivas quantidades de vezes já tocadas é "1", "2", "3", "4", "5", "1"
When o método getHotSongs é chamado
Then as músicas são dispostas na ordem "5", "4", "3", "2", "1", utilizando como desempate a permanência da música cadastrada há mais tempo