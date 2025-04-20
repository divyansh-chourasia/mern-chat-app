import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to extract incomming json payload from browser (req.body)

// app.get("/", (req, res) => {  res.send("Server ready"); });

import authRoutes from './routes/auth.routes.js'
app.use("/api/auth", authRoutes)
 
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
