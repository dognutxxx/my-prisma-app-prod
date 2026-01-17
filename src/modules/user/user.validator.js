const validateCreateUser = (data) => {
  const errors = [];
  if (!data.email) errors.push('Email is required');
  // Add more validation as needed
  if (errors.length > 0) return errors.join(', ');
  return null;
};

module.exports = {
  validateCreateUser,
};
