import productModel from './models/product.model.js';

class ProductDAO {

  getAll = () => productModel.find();

  getById = (id) => productModel.findById(id);

  create = (data) => productModel.create(data);

  update = (id, data) =>
    productModel.findByIdAndUpdate(id, data, { new: true });

  delete = (id) =>
    productModel.findByIdAndDelete(id);
}

export default ProductDAO;