export default class CartController {

  constructor(service) {
    this.service = service;
  }

  addProductToCart = async (req, res) => {
    try {

      const result = await this.service.addProductToCart(
        req.params.cid,
        req.params.pid
      );

      res.send({ status: "success", payload: result });

    } catch (error) {
      res.status(400).send({
        status: "error",
        message: error.message
      });
    }
  };

  purchaseCart = async (req, res) => {
    try {

      const result = await this.service.purchaseCart(
        req.params.cid,
        req.user.email
      );

      res.send({ status: "success", ...result });

    } catch (error) {
      res.status(500).send({
        status: "error",
        message: error.message
      });
    }
  };
}