import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./Router/route.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDb();



app.use("/api", router);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on ${port}`));

















