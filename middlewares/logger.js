// import format from "date-fns/format";
import format from "date-fns/format/index.js";
import { v4 as uuid } from "uuid";
import path from "path";
import { default as fsWithCallbacks } from "fs";
const fsPromises = fsWithCallbacks.promises;

export const logEvent = (logFileName) => async (message) => {
  const dateTime = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    !fs.existsSync(path.join(__dirname, "..", "logs")) &&
      (await fsPromises.mkdir(path.join(__dirname, "..", "logs")));
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

export const logger = (req, res, next) => {
  const message = `${req.method}\t${req.url}\t${req.headers.origin}`;
  logEvent(message, "reqLog.log");
  next();
};

// module.exports = { logEvent, logger };
