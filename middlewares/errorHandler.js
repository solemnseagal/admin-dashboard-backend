import { logEvent } from "./logger.js";

const errorHandler = (err, req, res, next) => {
  console.log(err);
  const message = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
  logEvent(message, "errLog.log");
  // console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500; //internal server error

  res.status(status);

  res.json({ message: err.message });
};

export default errorHandler;

// module.exports = errorHandler;
