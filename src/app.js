import express from 'express';
import { routes } from './routes/index.js';

export const app = express();

app.use(
  express.urlencoded({
    entended: true,
  })
);

routes(app)