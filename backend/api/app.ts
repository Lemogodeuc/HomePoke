import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes"
import { logger } from "../utils"
import { errorMiddleware } from "./middlewares"
import error from "./modules/errors"
import { DataSources } from "../services/database"

dotenv.config();

export class Context {
  dataSources: any;
  logger: any;
  error: any;

  constructor(public context: any ) {
    this.dataSources = context.DataSources;
    this.logger = context.logger;
    this.error = context.error;
  }
}

//TODO: move out type declaration & context initiator
declare global {
  namespace Express {
    interface Request {
      context: Context
    }
  }
}

const app = express();

// const swaggerUi = require("swagger-ui-express");
// const swaggerSpec = require(path.resolve("doc/swaggerOptions"));

app.use(cors());
app.use(express.static(path.resolve("app/public")));
app.use(express.urlencoded({ extended: true }), express.json());


app.use((req, _, next) => {
  req.context = new Context({ DataSources, logger, error });
  next();
});

// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec, {
//     swaggerOptions: {
//       deepLinking: true,
//       filter: true,
//       defaultModelsExpandDepth: -1,
//       defaultModelExpandDepth: 3
//     }
//   })
// );

app.use("/", router);
app.use(errorMiddleware);

export default app;