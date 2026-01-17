const authService = require('./auth.service');
const { successResponse } = require('../../utils/response');

const register = async (req, res, next) => {
  try {
    const { user, token } = await authService.register(req.body);
    successResponse(res, { user, token }, 'User registered successfully', 201);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body);
    successResponse(res, { user, token }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
    try {
        // User is attached to req by auth middleware
        successResponse(res, req.user, 'Current user profile');
    } catch (error) {
        next(error);
    }
}

module.exports = {
  register,
  login,
  getMe
};
