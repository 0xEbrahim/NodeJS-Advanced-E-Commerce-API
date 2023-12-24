import "dotenv/config"
import "./config/database.js"
import express from 'express';
import morgan from 'morgan'
import categoryRoute from './routes/categoryRoute.js'
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({extended : false}));
if (process.env.NODE_ENV === "development"){ 
    app.use(morgan("dev"));
}


app.use('/api/v1/category', categoryRoute);

app.listen(PORT, () => {
    console.log("App is running on => ", PORT);
})