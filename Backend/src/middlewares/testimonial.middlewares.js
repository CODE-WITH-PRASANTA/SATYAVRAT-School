// Example middleware
const exampleMiddleware = (req, res, next) => {
  console.log("Middleware working");
  next();
};

module.exports = exampleMiddleware;