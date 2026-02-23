import UserDTO from "../dto/user.dto.js";

export default class SessionsController {

  constructor(service) {
    this.service = service;
  }

  login = async (req, res) => {
    try {

      const token = this.service.generateToken(req.user);

      res.send({
        status: "success",
        access_token: token
      });

    } catch (error) {
      res.status(500).send({
        status: "error",
        message: error.message
      });
    }
  };

  current = async (req, res) => {
    try {

      const userDTO = new UserDTO(req.user);

      res.send({
        status: "success",
        user: userDTO
      });

    } catch (error) {
      res.status(500).send({
        status: "error",
        message: error.message
      });
    }
  };

}