import express from "express";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import merchantRoutes from "./routes/merchantRoutes";
import retailerRoutes from "./routes/retailerRoutes";

const app = express();
app.use(express.json());
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/merchant", merchantRoutes);
app.use("/retailer", retailerRoutes);

app.get("/", (req, res) => {
    res.send("hello world e");
});

app.listen(3000, () => {
    console.log("Start listening");
});
