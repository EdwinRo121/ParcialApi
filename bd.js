const { Client } = require('pg');

const client = new Client({
  host: 'aws-0-us-east-2.pooler.supabase.com',
  user: 'postgres.ntijexivkafeylaqisqg',
  password: '3114762052',
  database: 'postgres',
  port: 5432,
});

client.connect()
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error al conectar a PostgreSQL', err));

module.exports = client;
