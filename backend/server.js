import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";


import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to extract incomming json payload from browser (req.body)
app.use(cookieParser())
// app.get("/", (req, res) => {  res.send("Server ready"); });

app.use("/api/auth", authRoutes)
 
app.use("/api/messages", messageRoutes)

app.use("/api/users", userRoutes)

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
