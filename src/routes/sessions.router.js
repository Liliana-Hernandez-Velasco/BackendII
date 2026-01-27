import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login",
  passport.authenticate("login", { session: false }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, "coderSecret", { expiresIn: "1h" });
    res.send({ status: "success", access_token: token });
  }
);

router.get("/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({ status: "success", user: req.user });
  }
);

export default router;
