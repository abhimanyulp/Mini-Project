const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes")
const { noteRouter } = require("./routes/note.routes")
const { auth } = require("./middleware/auth.middlware");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


app.get("/",(req,res) => {

    res.send("Welcome to Home Route")
})

app.use("/users", userRouter);
app.use(auth);
app.use("/notes", noteRouter)


const Port = process.env.port || 4400

app.listen(Port, async () => {
    try {
        await connection;
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Not able to connect to MongoDB");
        console.log(err);
    }
    console.log(`Server is running at port ${Port}`);
})