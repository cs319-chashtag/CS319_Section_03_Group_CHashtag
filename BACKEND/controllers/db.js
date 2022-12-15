const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "ProjectDb", 
    password: "Karakobra2",
    port: 5432,
});

module.exports = pool; 
