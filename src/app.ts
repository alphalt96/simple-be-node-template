import 'reflect-metadata';
import express, { Express } from 'express';
require('dotenv').config();
import bodyParser from 'body-parser';

import { UserModule } from './users'
import { AuthModule } from './auth';
import { MealHistoryModule } from './mealHistories';
import { RecordModule } from './records';
import { RecommendModule } from './recommends';

// initialize modules
const userModule = new UserModule().getModule();
const authModule = new AuthModule().getModule();
const mealHistoryModule = new MealHistoryModule().getModule();
const recordModule = new RecordModule().getModule();
const recommendModule = new RecommendModule().getModule();


const app: Express = express();
const port = process.env.PORT;

// import external modules into application
app.use(bodyParser.json());

// import internal modules into application
app.use(userModule);
app.use(authModule);
app.use(mealHistoryModule);
app.use(recordModule);
app.use(recommendModule);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
