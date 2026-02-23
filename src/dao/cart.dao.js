import { cartModel } from './models/cartModel.js';

class CartDAO {

  getById = (id) =>
    cartModel.findById(id).populate('products.product');

  create = () =>
    cartModel.create({ products: [] });

  update = (id, data) =>
    cartModel.findByIdAndUpdate(id, data, { new: true });

  save = (cart) => cart.save();
}

export default CartDAO;