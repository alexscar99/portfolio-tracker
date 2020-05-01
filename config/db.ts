import { createConnection, createPool } from 'mysql';

/*
  
  TODO: Fix this file

  TODO: Finish exported methods for working with SQL db outside of this module

*/

const state = {
  pool: null,
  mode: null,
};

exports.connect = (mode, done) => {
  state.pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  state.mode = mode;
  done();
});

exports.get = () => {
  return state.pool;
};

exports.fixtures = async (data) => {
  const pool = state.pool
  if (!pool) {
    return done(new Error('Missing database connection.'))
  }

  const names = Object.keys(data.tables)
  
  // TODO: fix rest of this
};



/*

    THE FOLLOWING WORKS WHEN IN `server.ts`

    ====================================================================================



const connection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  insecureAuth: true,
});

connection.connect((err) => {
  if (err) {
    // tslint:disable-next-line:no-console
    console.log(`Error: ${err.sqlMessage}`);
    process.exit(1);
  }

  // tslint:disable-next-line:no-console
  console.log(`MySQL Connected: ${process.env.DB_NAME}`);
});

connection.query(
  'CREATE TABLE user(id int primary key, name varchar(255), age int, address text)',
  (err) => {
    if (err) {
      // tslint:disable-next-line:no-console
      console.log(err);
    }

    // tslint:disable-next-line:no-console
    console.log('Successfully added table');
  }
);

connection.end();

*/
