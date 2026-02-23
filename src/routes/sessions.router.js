import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req, res) =>
    req.sessionsController.login(req, res)
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) =>
    req.sessionsController.current(req, res)
);

export default router;