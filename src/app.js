const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error.middleware');
const rateLimitMiddleware = require('./middlewares/rateLimit.middleware');
const userRoute = require('./modules/user/user.route');
const app = express();

const helmet = require('helmet');
const morgan = require('morgan');
// Middlewares
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Restrict to Frontend URL in production
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(rateLimitMiddleware);

// Swagger - only in development
if (process.env.NODE_ENV !== 'production') {
  const swaggerUi = require('swagger-ui-express');
  const swaggerSpecs = require('./config/swagger');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
}

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to My Prisma App API' });
});

app.use('/api/users', userRoute);
app.use('/api/auth', require('./modules/auth/auth.route'));
app.use('/api/orders', require('./modules/order/order.route'));

// Error handling
app.use(errorMiddleware);

module.exports = app;
