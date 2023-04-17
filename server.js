import express from "express";
import dotenv from "dotenv";
import contactRouter from './routes/contactRoutes.js'
import userRouter from './routes/userRoutes.js'
import { errorHandler } from "./middleware/errorHandler.js";
import connectionDb from "./config/dbConnection.js";
dotenv.config();


connectionDb()
const app = express();
const port = process.env.PORT || 8081;


app.use(express.json())
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`App is started on ${port}...`);
});
