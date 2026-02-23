import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/user.dto.js";

const router = Router();

// LOGIN
router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req, res) => {

    // Generar token con variable de entorno
    const token = jwt.sign(
      { user: req.user },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.send({
      status: "success",
      access_token: token
    });
  }
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const user = new UserDTO(req.user);

    res.send({
      status: "success",
      user
    });
  }
);

export default router;