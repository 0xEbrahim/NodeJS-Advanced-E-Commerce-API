
const errorHandler = (err, req, res, next) => {
 if(process.env.NODE_ENV == "development")
    sendErrorOnDev(err,res)
  else
    sendErrorOnProd(err, res);
};

const sendErrorOnDev = (err, res) => {
   res.status(err.statusCode || 500).json({
     status: err.status || "Error",
     error: err,
     msg: err.message,
     stack: err.stack,
   });
}

const sendErrorOnProd = (err, res) => {
   res.status(err.statusCode || 500).json({
     status: err.status || "Error",
     msg: err.message,
   });
}

export {errorHandler}