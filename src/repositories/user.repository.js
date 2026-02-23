export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getUserByEmail(email) {
    return await this.dao.getByEmail(email);
  }

  async getUserById(id) {
    return await this.dao.getById(id);
  }

  async createUser(user) {
    return await this.dao.create(user);
  }
}