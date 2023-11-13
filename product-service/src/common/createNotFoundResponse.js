module.exports = (message, statusCode = 404) => ({
  statusCode,
  body: JSON.stringify({ message }),
});
