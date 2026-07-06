const express = require("express");
const cors = require("cors");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const saleRoutes = require("./routes/saleRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");

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
app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);
// app.use("/api/sales", saleRoutes);
app.use("/api/purchases", purchaseRoutes);


app.use(errorHandler);

module.exports = app;