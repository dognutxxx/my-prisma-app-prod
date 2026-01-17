const orderService = require('./order.service');
const { successResponse } = require('../../utils/response');
const { validateCreateOrder, validateUpdateOrder } = require('./order.validator');

const createOrder = async (req, res, next) => {
  try {
    const error = validateCreateOrder(req.body);
    if (error) {
      const err = new Error(error);
      err.statusCode = 400;
      throw err;
    }

    const order = await orderService.createOrder(req.body);
    successResponse(res, order, 'Order created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    successResponse(res, orders, 'Orders retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    successResponse(res, order, 'Order retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check existence
    const existingOrder = await orderService.getOrderById(id);
    if (!existingOrder) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    
    const validationError = validateUpdateOrder(req.body);
    if (validationError) {
        const error = new Error(validationError);
        error.statusCode = 400;
        throw error;
    }

    const updatedOrder = await orderService.updateOrder(id, req.body);
    successResponse(res, updatedOrder, 'Order updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
         // Check existence
        const existingOrder = await orderService.getOrderById(id);
        if (!existingOrder) {
            const error = new Error('Order not found');
            error.statusCode = 404;
            throw error;
        }

        await orderService.deleteOrder(id);
        successResponse(res, null, 'Order deleted successfully');
    } catch (error) {
        next(error);
    }
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
