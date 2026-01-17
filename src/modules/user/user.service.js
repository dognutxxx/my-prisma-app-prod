const prisma = require('../../config/prisma');

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
};

const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
