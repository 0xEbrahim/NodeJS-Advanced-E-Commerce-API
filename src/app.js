import "dotenv/config";
import "./config/database.js";
import express from "express";
import morgan from "morgan";
import ApiError from "./utils/apiError.js";
import categoryRoute from "./routes/categoryRoute.js";
import subCategoryRoute from './routes/subCategoryRoute.js'
import brandRoute from './routes/brandRoute.js'
import productRoute from './routes/productRoute.js'
import { errorHandler } from "./middlewares/errorHandling.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routes
app.use('/api/v1/products', productRoute)
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/sub-categories", subCategoryRoute);
app.use('/api/v1/brands', brandRoute);
app.all("*", (req, res, next) => {
  next(new ApiError(`Route not found: ${req.originalUrl}`, 404));
});

// Global Error Handling middleware on express
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log("App is running on => ", PORT);
});

// handling erros outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down...`);
    process.exit(1);
  });
});
