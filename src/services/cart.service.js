import crypto from 'crypto';

class CartService {

  constructor(cartRepository, productRepository, ticketService) {
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
    this.ticketService = ticketService;
  }

  addProductToCart = async (cid, pid) => {

    const cart = await this.cartRepository.getCartById(cid);

    const product = await this.productRepository.getProductById(pid);

    if (!product) throw new Error("Product not found");

    const existing = cart.products.find(
      p => p.product._id.toString() === pid
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    return this.cartRepository.saveCart(cart);
  };

  purchaseCart = async (cid, userEmail) => {

    const cart = await this.cartRepository.getCartById(cid);

    const purchasable = [];
    const notPurchasable = [];

    for (let item of cart.products) {

      const product = item.product;

      if (product.stock >= item.quantity) {

        product.stock -= item.quantity;
        await product.save();

        purchasable.push(item);

      } else {
        notPurchasable.push(item);
      }
    }

    const totalAmount = purchasable.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    const ticket = await this.ticketService.createTicket(
      totalAmount,
      userEmail
    );

    cart.products = notPurchasable;
    await this.cartRepository.saveCart(cart);

    return {
      ticket,
      notProcessed: notPurchasable.map(p => p.product._id)
    };
  }
}

export default CartService;