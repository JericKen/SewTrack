const express = require("express");
const cors = require("cors");

const categoryRoutes = require("./routes/categoryRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to SewTrack API"
    });
});

app.use("/api/categories", categoryRoutes); 


app.use(errorHandler);

module.exports = app;