import express from "express";
import { json } from "body-parser";
import exp from "constants";
import webhookRouter from "./routes/webhook.route";

const app = express();

app.use(json());
app.use(webhookRouter);

export default app;
