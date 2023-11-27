Scenario: autoavaliação bem sucedida
Given estou na página de “autoavaliação de metas”
And eu vejo uma lista de metas, que devo avaliar com as opções “MANA, MPA e MA”
When preencho as todas as metas da autoavaliação, escolhendo uma das opções para cada meta
And aperto no botão para submeter minha autoavaliação
Then aparece na tela um pop-up indicando que minha autoavaliação foi registrada com sucesso
