import { Router } from 'express';
import { productDBManager } from '../dao/productDBManager.js';
import { cartDBManager } from '../dao/cartDBManager.js';
import { Router } from 'express';
import passport from 'passport';
import TicketService from '../services/ticket.service.js';

const router = Router();
const ProductService = new productDBManager();
const CartService = new cartDBManager(ProductService);
const ticketService = new TicketService();

router.post('/:cid/purchase',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {

    // Integrate your real cart lookup logic here
    const cart = req.cart; 

    const purchasable = [];
    const notPurchasable = [];

    for (let item of cart.products) {
      if (item.product.stock >= item.quantity) {
        item.product.stock -= item.quantity;
        purchasable.push(item);
      } else {
        notPurchasable.push(item);
      }
    }

    const totalAmount = purchasable.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    const ticket = await ticketService.createTicket(
      totalAmount,
      req.user.email
    );

    res.send({
      status: 'success',
      ticket,
      notProcessed: notPurchasable.map(p => p.product._id)
    });
  }
);
router.get('/:cid', async (req, res) => {

    try {
        const result = await CartService.getProductsFromCartByID(req.params.cid);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.post('/', async (req, res) => {

    try {
        const result = await CartService.createCart();
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {

    try {
        const result = await CartService.addProductByID(req.params.cid, req.params.pid)
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {

    try {
        const result = await CartService.deleteProductByID(req.params.cid, req.params.pid)
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.put('/:cid', async (req, res) => {

    try {
        const result = await CartService.updateAllProducts(req.params.cid, req.body.products)
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.put('/:cid/product/:pid', async (req, res) => {

    try {
        const result = await CartService.updateProductByID(req.params.cid, req.params.pid, req.body.quantity)
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.delete('/:cid', async (req, res) => {

    try {
        const result = await CartService.deleteAllProducts(req.params.cid)
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

export default router;