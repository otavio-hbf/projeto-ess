Feature: Hot

Scenario: Mostrar as top músicas
Given já existem 6 músicas de ids "1", "2", "3", "4", "5", "6" cadastradas
And suas respectivas quantidades de vezes já tocadas é "1", "2", "3", "4", "5", "6"
When uma requisição GET for enviada para a rota "/api/hot"
Then o status da resposta é 200
And o JSON da resposta deve conter os ids e nomes das 5 músicas mais tocadas

Scenario: Mostrar as top músicas por gênero
Given já existem 6 músicas de ids "1", "2", "3", "4", "5", "6" cadastradas com gênero "MPB"
And suas respectivas quantidades de vezes já tocadas é "1", "2", "3", "4", "5", "6"
When uma requisição GET for enviada para a rota "/api/hot?genre=MPB"
Then o status da resposta é 200
And o JSON da resposta deve conter os ids e nomes das 5 músicas mais tocadas do gênero "MPB"
 
Scenario: Obter top 5 músicas quando há menos cadastradas
Given já existem 4 músicas de ids "1", "2", "3", "4" cadastradas
And suas respectivas quantidades de vezes já tocadas é "1", "2", "3", "4"
When uma requisição GET for enviada para a rota "/api/hot"
Then o status da resposta é "200"
And o JSON da resposta inclui todas as 4 músicas ordenadas por vezes que já foram tocadas

Scenario: Obter top 5 músicas de determinado gênero quando há menos cadastradas
Given já existem 4 músicas de ids "1", "2", "3", "4" cadastradas com gênero "MPB"
And suas respectivas quantidades de vezes já tocadas é "1", "2", "3", "4"
When uma requisição GET for enviada para a rota "/api/hot?genre=MPB"
Then o status da resposta é "200"
And o JSON da resposta inclui os ids e nomes apenas das 4 músicas do gênero "MPB"

Scenario: Inserir na URL um gênero não cadastrado na base de dados
Given não há músicas do gênero "generonaoexistente"
When uma requisição GET for enviada para a rota "/api/hot?genre=generonaoexistente"
Then o status da resposta é 404
And a mensagem retornada é "Genre not found"