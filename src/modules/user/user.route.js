const express = require('express');
const userController = require('./user.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         role:
 *           type: string
 *     UserCreate:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *         name:
 *           type: string
 *       example:
 *         email: johndoe@example.com
 *         name: John Doe
 *     UserUpdate:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         name:
 *           type: string
 *       example:
 *         email: johndoe@example.com
 *         name: John Doe
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns the list of all the users (ADMIN only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden
 *   post:
 *     summary: Create a new user (ADMIN only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * 
 * /api/users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: The user description by id
 *   patch:
 *     summary: Update the user by id
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: The updated user
 *   delete:
 *     summary: Delete the user by id (ADMIN only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: The user was deleted
 *       403:
 *         description: Forbidden
 */

router.use(authMiddleware);

// Restricted to ADMIN
router.get('/', roleMiddleware(['ADMIN']), userController.getUsers);
router.post('/', roleMiddleware(['ADMIN']), userController.createUser);
router.delete('/:id', roleMiddleware(['ADMIN']), userController.deleteUser);

// Accessible by any authenticated user
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.updateUser);

module.exports = router;
