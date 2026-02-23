class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getUserByEmail = (email) => {
    return this.dao.getByEmail(email);
  };

  createUser = (user) => {
    return this.dao.create(user);
  };
}

export default UserRepository;