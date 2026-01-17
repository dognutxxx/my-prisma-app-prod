const userService = require('./user.service');
const { successResponse } = require('../../utils/response');
const { validateCreateUser } = require('./user.validator');

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    successResponse(res, users, 'Users retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const validationError = validateCreateUser(req.body);
    if (validationError) {
      const error = new Error(validationError);
      error.statusCode = 400;
      throw error;
    }

    const user = await userService.createUser(req.body);
    successResponse(res, user, 'User created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    successResponse(res, user, 'User retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if user exists first
    const existingUser = await userService.getUserById(id);
    if (!existingUser) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const updatedUser = await userService.updateUser(id, req.body);
    successResponse(res, updatedUser, 'User updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if user exists first
    const existingUser = await userService.getUserById(id);
    if (!existingUser) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    await userService.deleteUser(id);
    successResponse(res, null, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
