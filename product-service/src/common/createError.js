module.exports = (message, statusCode = 500) => ({
  statusCode,
  body: JSON.stringify({ message }),
});
