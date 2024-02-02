import sql from "./db.js"

// sql`DROP TABLE IF EXISTS songs;`.then(() => {
//     console.log('Tabela apagada!')
// })

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