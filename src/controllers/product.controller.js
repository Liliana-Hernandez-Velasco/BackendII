export default class ProductController {

  constructor(service) {
    this.service = service;
  }

  getProducts = async (req, res) => {
    try {
      const products = await this.service.getProducts();
      res.send({ status: "success", payload: products });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  };

  createProduct = async (req, res) => {
    try {
      const product = await this.service.createProduct(req.body);
      res.status(201).send({ status: "success", payload: product });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const updated = await this.service.updateProduct(
        req.params.pid,
        req.body
      );
      res.send({ status: "success", payload: updated });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      await this.service.deleteProduct(req.params.pid);
      res.send({ status: "success", message: "Deleted" });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  };
}