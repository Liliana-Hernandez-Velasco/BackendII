class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  registerUser = async (userData) => {
    return this.repository.createUser(userData);
  };
}

export default UserService;