import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import {register} from "./controllers/auth.js";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import postRoutes from './routes/posts.js';
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
import User from "./models/Post.js";
import Post from "./models/User.js";
import {users} from './data/index.js'



// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/assests", express.static(path.join(__dirname, 'public/assests')));



// FILE STORAGE
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname )
    }
})
const upload = multer(storage);



//Routes with files
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);



//Mongoose Setup
const PORT = process.env.PORT || 6000;
mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
}).then((() => {
    app.listen(PORT, () => console.log(`Server Running on Port : ${PORT}`));
    // User.insertMany(users);
    // Post.inserMany(posts);
})).catch((error)=>console.log(`${error} did not connect`))
