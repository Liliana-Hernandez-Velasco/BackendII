import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      { user },
      "coderSecret",
      { expiresIn: "1h" }
    );

    res.send({
      status: "success",
      access_token: token
    });
  }
);

export default router;
