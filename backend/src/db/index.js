// backend/src/db/index.js
import knexModule from 'knex';

const knex = knexModule({
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3',
  },
  useNullAsDefault: true,
});

export default knex;
