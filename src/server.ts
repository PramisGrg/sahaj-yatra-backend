import http from "http";
import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/db.config";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
