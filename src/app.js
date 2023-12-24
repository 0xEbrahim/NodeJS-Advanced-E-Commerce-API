import "dotenv/config";
import "./config/database.js";
import express from "express";
import morgan from "morgan";
import ApiError from "./utils/apiError.js";
import categoryRoute from "./routes/categoryRoute.js";
import { errorHandler } from "./middlewares/errorHandling.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routes
app.use("/api/v1/categories", categoryRoute);

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
  server.close(()=>{
  console.error(`Shutting down...`);
  process.exit(1);
  });
})
