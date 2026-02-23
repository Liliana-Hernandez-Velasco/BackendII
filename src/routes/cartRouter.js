import { Router } from 'express';
import passport from 'passport';
import authorization from '../middlewares/authorization.middleware.js';

const router = Router();

router.post(
  '/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  authorization(['user']),
  (req, res) =>
    req.cartController.addProductToCart(req, res)
);

router.post(
  '/:cid/purchase',
  passport.authenticate('jwt', { session: false }),
  authorization(['user']),
  (req, res) =>
    req.cartController.purchaseCart(req, res)
);

router.post(
  '/:cid/purchase',
  passport.authenticate('jwt', { session: false }),
  authorization(['user']),
  (req, res) => req.cartController.purchase(req, res)
);
export default router;