import UserModel from '../models/user.model.js';

class UserDAO {
  getByEmail = (email) => UserModel.findOne({ email });
  create = (user) => UserModel.create(user);
}

export default UserDAO;