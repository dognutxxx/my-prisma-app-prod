const express = require('express');
const orderController = require('./order.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The orders managing API
 */

router.use(authMiddleware);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Returns the list of all orders (ADMIN & MANAGER only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the orders
 */
router.get('/', roleMiddleware(['ADMIN', 'MANAGER']), orderController.getOrders);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: The created order
 */
router.post('/', orderController.createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get the order by id
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The order description by id
 *   patch:
 *     summary: Update the order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The updated order
 *   delete:
 *     summary: Delete the order (ADMIN only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The order was deleted
 */
router.get('/:id', orderController.getOrderById);
router.patch('/:id', orderController.updateOrder);
router.delete('/:id', roleMiddleware(['ADMIN']), orderController.deleteOrder);

module.exports = router;
