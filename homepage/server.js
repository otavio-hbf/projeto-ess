

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
server.get('/feed', (request, reply) =>{
    return reply.send('PAGINA INICIAL:\nEscutas Recentes:\nFor you:')
})

//search bar
server.get('/feed/search', (request, reply) =>{
    return reply.send('PAGINA DE PESQUISA:\nPesquise aqui sua musica ->')
})

//search bar
server.post('/feed/search', (request, reply) =>{ 

    console.log('Search query made.');
    return reply.status(200).send()
})

server.get('/feed/search/:filter', (request, reply) =>{
    const filter = request.params.filter
    console.log(filter)
    return reply.send('PAGINA DE PESQUISA (com filtro):\nPesquise aqui sua musica (com filtro)->')
})

//userpage precisa de um parametro para identificar qual eh o usuario em questao
server.get('/feed/userpage/:userid', (request, reply) =>{
    const userId = request.params.userid;
    console.log(userId)
    return reply.send('PAGINA DO USUARIO:\nAqui uma abobrinha sobre você ->')
})

server.get('/feed/track/:trackid', (request, reply) =>{
    const trackId = request.params.trackid;
    console.log(trackId)
    return reply.send('Uma musiquinha qualquer lalalala!!!')
})

server.listen({
    port: 3333,
})