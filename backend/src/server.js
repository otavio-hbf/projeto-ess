import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()
const database = new DatabasePostgres()

server.post('/songs', async(request, reply) => {
    const { title, duration } = request.body

    await database.create({
        title,
        duration
    })

    return reply.status(201).send()
})

server.get('/songs', async(request) => {
    const search = request.query.search    
    // const videos = await database.list(search)

    return "test"//videos
})

server.put('/videos/:id', async(request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async(request, reply) => {
    const videoId = request.params.id
    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})

console.log("Server running on ","localhost:3333");