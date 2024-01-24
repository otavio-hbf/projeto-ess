

/*
Rotas necessarias:

*rota do feed
*rota de cada uma das musicas
*rota da pagina de pesquisa
    -rota para cada um dos filtros?
*rota da pagina do usuario
*/


import {fastify} from 'fastify'

const server = fastify()


server.get('/feed', () =>{
    return 'PAGINA INICIAL:\nEscutas Recentes:\nFor you:'
})

server.listen({
    port: 3333,
})