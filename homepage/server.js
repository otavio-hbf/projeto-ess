

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

//homepage
server.get('/feed', () =>{
    return 'PAGINA INICIAL:\nEscutas Recentes:\nFor you:'
})

//search bar
server.get('/feed/search', () =>{
    return 'PAGINA DE PESQUISA:\nPesquise aqui sua musica ->'
})

//userpage precisa de um parametro para identificar qual eh o usuario em questao
server.get('/feed/userpage/:userid', (request, reply) =>{
    const userId = request.params.userid;
    console.log(userId)
    return reply.send('PAGINA DO USUARIO:\nAqui uma abobrinha sobre você ->')
})

server.listen({
    port: 3333,
})