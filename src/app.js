import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import passport from 'passport';
import dotenv from 'dotenv';

import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import usersRouter from './routes/users.router.js';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/viewsRouter.js';

import { initializePassport } from './config/passport.config.js';
import __dirname from './utils/constantsUtil.js';
import websocket from './websocket.js';

import ProductDAO from './dao/product.dao.js';
import ProductRepository from './repositories/product.repository.js';
import ProductService from './services/product.service.js';
import ProductController from './controllers/product.controller.js';

import CartDAO from './dao/cart.dao.js';
import CartRepository from './repositories/cart.repository.js';
import CartService from './services/cart.service.js';
import CartController from './controllers/cart.controller.js';
import TicketService from './services/ticket.service.js';

import SessionsService from './services/sessions.service.js';
import SessionsController from './controllers/sessions.controller.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI);


initializePassport();
app.use(passport.initialize());


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


const productDAO = new ProductDAO();
const productRepository = new ProductRepository(productDAO);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

app.use((req, res, next) => {
  req.productController = productController;
  next();
});

const cartDAO = new CartDAO();
const cartRepository = new CartRepository(cartDAO);
const ticketService = new TicketService();

const cartService = new CartService(
  cartRepository,
  productRepository,
  ticketService
);

const cartController = new CartController(cartService);

app.use((req, res, next) => {
  req.cartController = cartController;
  next();
});

const sessionsService = new SessionsService();
const sessionsController = new SessionsController(sessionsService);

app.use((req, res, next) => {
  req.sessionsController = sessionsController;
  next();
});

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/users', usersRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);

const PORT = process.env.PORT || 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

const io = new Server(httpServer);
websocket(io);