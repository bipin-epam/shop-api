module.exports = (message, data, statusCode = 200) => ({
  statusCode,
  body: JSON.stringify({ message, data }),
});
