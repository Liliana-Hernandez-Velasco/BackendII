import jwt from "jsonwebtoken";

class SessionsService {

  generateToken = (user) => {
    return jwt.sign(
      { user },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  };

}

export default SessionsService;