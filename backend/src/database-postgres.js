import { randomUUID } from "node:crypto"
import sql from "./db.js"

export class DatabasePostgres {
    async list(search) {
        let videos

        if (search) {
            videos = await sql`select * from songs where title ilike ${'%' + search + '%'}`
        } else {
            videos = await sql`select * from songs`
        }

        return videos
    }

    async create(video) {
        const videoID = randomUUID()
        const { title, description, duration } = video

        await sql`insert into songs(id, title, duration) VALUES (${videoID}, ${title}, ${duration})`
    }

    async update(id, video) {
        const { title, description, duration } = video

        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
    }

    async delete(id) {
        await sql`delete from videos where id = ${id}`
    }
}