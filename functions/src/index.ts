import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import * as logger from "firebase-functions/logger";

import { initializeApp, getApps } from "firebase-admin/app";
const { connectWithConnector } = require('./db.js');

if (!getApps().length) {
  initializeApp();
}

const app = express();
app.use(express.json());
app.get("/golf-courses", async (req, res) => {
  logger.info("Publicly listing golf-courses...");
  res.json([]);
});

app.get('/golfers', async (req, res) => {
  try {
    const config = {};
    const connection = await connectWithConnector(config);  
    const result = await connection.request().query('SELECT TOP 100 * FROM Golfers');
    res.json(result.recordset);
  } catch (err) {
    logger.error('Error running query:', err);
    res.status(500).send('DB query failed');
  }
});

export const api_functions = onRequest(
  {
    invoker: "public", 
  },
  app
);
