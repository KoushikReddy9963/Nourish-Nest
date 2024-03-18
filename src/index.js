import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import signUp from "./Database/mongodb.js";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const indexPath = path.join(__dirname, "../public/index.html");

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db_url = process.env.MONGODB_URL || "mongodb+srv://Koushik:1234@koushik.xbrofez.mongodb.net/NourishNest";
const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("DB connected");
    } catch (error) {
        console.log(error);
    }
};
connectDB(db_url);

app.get("/", (req, res) => {
    res.sendFile(indexPath);
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

app.get("/about", (re, res) => {
    res.sendFile(path.join(__dirname, "../public/about.html"));
})

app.get("/nourish", (re, res) => {
    res.sendFile(path.join(__dirname, "../public/nourish.html"));
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        res.send("Please enter both email and password");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
    console.log(email, password);
    console.log("You have successfully logged in");
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await signUp(email, password);
        if (result.success) {
            res.sendFile(path.join(__dirname, "../public/login.html"));
        } else {
            res.send(result.message);
        }
    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).send("An error occurred while signing up.");
    }
});

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});
