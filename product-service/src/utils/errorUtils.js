const buildInvalidationError = (error) => {
  const errors = [];
  for (const { message } of error.details) {
    errors.push(message);
  }
  return errors;
};

module.exports = { buildInvalidationError };
