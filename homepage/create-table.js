import {sql} from './db.js'

sql`
CREATE TABLE songs (
    title TEXT,
    artist TEXT,
    id TEXT,
    genre TEXT,
    duration INTEGER
);
`.then(() =>{
    console.log('Table created.')
})