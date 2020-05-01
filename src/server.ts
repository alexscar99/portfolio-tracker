import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config({
  path: './config/config.env',
});

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// start express server
app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
