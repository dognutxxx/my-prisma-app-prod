const validateCreateOrder = (data) => {
  const errors = [];
  
  if (!data.items) errors.push('Items are required');
  if (!data.total) errors.push('Total amount is required');
  
  // Basic validation for items if necessary
  // if (data.items && !Array.isArray(data.items)) errors.push('Items must be an array');

  if (errors.length > 0) return errors.join(', ');
  return null;
};

const validateUpdateOrder = (data) => {
  const errors = [];
  // Add validation logic for update if needed
  // For example, validate status update
  if(data.status && !['PENDING', 'COMPLETED', 'CANCELLED'].includes(data.status)) {
    errors.push('Invalid status');
  }
  
  if (errors.length > 0) return errors.join(', ');
  return null;
}

module.exports = {
  validateCreateOrder,
  validateUpdateOrder
};
