import { Router } from "express";
import { UserModel } from "../models/user.model.js";
import { createHash } from "../utils/hash.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const exists = await UserModel.findOne({ email });
    if (exists)
      return res.status(400).send({ error: "Usuario ya existe" });

    const user = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password)
    });

    res.status(201).send({ status: "success", user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;