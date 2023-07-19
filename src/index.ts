import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import merchantRoutes from "./routes/merchantRoutes";
import retailerRoutes from "./routes/retailerRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import { ApiResponse } from "./models";
import { ErrorHandler } from "./utils";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/merchant", merchantRoutes);
app.use("/api/v1/retailer", retailerRoutes);
app.use("/api/v1transaction", transactionRoutes);

app.get("/", (req, res) => {
    res.send(`App is running on port ${PORT} `);
});
app.all("*", (req, res, next) => {
    next(new ApiResponse(`Can't find ${req.originalUrl} on the server`, "fail", 404));
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    error = ErrorHandler.process(error);
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
    });
});

app.listen(PORT, () => {
    console.log("Start listening");
});
