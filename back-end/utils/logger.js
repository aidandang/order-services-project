const logger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} at ${new Date().toString()}`);
  next();
}

module.exports = logger;