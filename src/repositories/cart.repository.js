class CartRepository {

  constructor(dao) {
    this.dao = dao;
  }

  getCartById = (id) =>
    this.dao.getById(id);

  createCart = () =>
    this.dao.create();

  updateCart = (id, data) =>
    this.dao.update(id, data);

  saveCart = (cart) =>
    this.dao.save(cart);
}

export default CartRepository;