import CustomError from '../utils/customError.js';

class CartService {
  constructor(cartRepository, productRepository, ticketRepository) {
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
    this.ticketRepository = ticketRepository;
  }

  async purchaseCart(cid, userEmail) {

    const cart = await this.cartRepository.getCartById(cid);

    if (!cart) throw new CustomError("Cart not found", 404);

    let totalAmount = 0;
    const notProcessed = [];
    const remainingProducts = [];

    for (const item of cart.products) {

      const product = await this.productRepository.getProductById(
        item.product._id
      );

      if (product.stock >= item.quantity) {

        // Restar stock
        await this.productRepository.updateProduct(
          product._id,
          { stock: product.stock - item.quantity }
        );

        totalAmount += product.price * item.quantity;

      } else {
        notProcessed.push(item.product._id);
        remainingProducts.push(item);
      }
    }

    let ticket = null;

    if (totalAmount > 0) {
      ticket = await this.ticketRepository.createTicket({
        amount: totalAmount,
        purchaser: userEmail
      });
    }

    // Actualizar carrito con productos no procesados
    await this.cartRepository.updateCart(cid, {
      products: remainingProducts
    });

    return {
      ticket,
      notProcessed
    };
  }
}

export default CartService;