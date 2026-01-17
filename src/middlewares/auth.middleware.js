const { verifyToken } = require('../utils/jwt');
const prisma = require('../config/prisma');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      const error = new Error('Invalid or expired token');
      error.statusCode = 401;
      throw error;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 401;
      throw error;
    }

    // Attach user to request object (exclude password)
    const { password: _, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
