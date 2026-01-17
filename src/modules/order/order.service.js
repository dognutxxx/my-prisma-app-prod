const prisma = require('../../config/prisma');

const createOrder = async (data) => {
  return await prisma.order.create({
    data,
    include: {
      user: true // Include user details if needed
    }
  });
};

const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      user: true
    }
  });
};

const getOrderById = async (id) => {
  return await prisma.order.findUnique({
    where: { id: parseInt(id) },
    include: {
      user: true
    }
  });
};

const updateOrder = async (id, data) => {
  return await prisma.order.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteOrder = async (id) => {
  return await prisma.order.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
