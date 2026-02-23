class ProductService {

  constructor(repository) {
    this.repository = repository;
  }

  getProducts = () =>
    this.repository.getProducts();

  createProduct = (data) =>
    this.repository.createProduct(data);

  updateProduct = (id, data) =>
    this.repository.updateProduct(id, data);

  deleteProduct = (id) =>
    this.repository.deleteProduct(id);
}

export default ProductService;