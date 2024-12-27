import express from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(helmet());

const allowedOrigin = "http://localhost:5173";

const corsOptions: any = {
  origin: function (origin: string, callback: Function) {
    if (allowedOrigin.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  preflightcontinue: true,
};

// const docOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Sahaj Yatra API",
//       version: "1.0.0",
//       description: "None for now",
//     },
//     servers: [
//       {
//         url: "http://localhost:8000/api/v1",
//       },
//     ],
//   },
//   apis: ["./src/api/v1/docs/*.yaml", "./src/api/v1/routes/*.ts"],
// };

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("*", (req, res) => {
  res.status(401).json({ error: "End point not found" });
});

export default app;
