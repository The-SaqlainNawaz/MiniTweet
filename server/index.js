import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";

//CONFIGURATIOM//

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(multer().none());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* File Storage */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

/* uplaod images*/
const upload = multer({ storage });

/* Routes */
app.use("/auth/register", upload.single("image"), register);

/*MongoDB Connection*/

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port: ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
