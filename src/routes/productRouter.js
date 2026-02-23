import { Router } from 'express';
import passport from 'passport';
import authorization from '../middlewares/authorization.middleware.js';

const router = Router();

router.get(
  '/',
  (req, res) =>
    req.productController.getProducts(req, res)
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorization(['admin']),
  (req, res) =>
    req.productController.createProduct(req, res)
);

router.put(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  authorization(['admin']),
  (req, res) =>
    req.productController.updateProduct(req, res)
);

router.delete(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  authorization(['admin']),
  (req, res) =>
    req.productController.deleteProduct(req, res)
);

export default router;