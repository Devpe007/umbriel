import express from 'express';

import './database/connect';

const app = express();

app.use(express.json());

export { app };