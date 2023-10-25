module.exports = async (schema, data) => {
  return schema.validateAsync(data);
};
