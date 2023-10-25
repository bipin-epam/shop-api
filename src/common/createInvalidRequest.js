module.exports = (message, error, statusCode = 400) => ({
  statusCode,
  body: JSON.stringify({ message, error }),
});
