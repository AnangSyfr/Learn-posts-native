import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { router } from "./routes";

//init app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//define port
const port = 3001;

//route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/uploads/:filename", (req, res) => {
    res.sendFile(path.join(__dirname, "uploads", req.params.filename));
});

app.use("/api", router);

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
