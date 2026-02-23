import { Router } from "express";
import { UserModel } from "../dao/models/user.model.js";
import { createHash } from "../utils/hash.js";

const router = Router();

// CREATE
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

// READ ALL
router.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.send({ status: "success", users });
});

// READ ONE
router.get("/:uid", async (req, res) => {
  const user = await UserModel.findById(req.params.uid);
  res.send({ status: "success", user });
});

// UPDATE
router.put("/:uid", async (req, res) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.params.uid,
    req.body,
    { new: true }
  );
  res.send({ status: "success", user: updatedUser });
});

// DELETE
router.delete("/:uid", async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.uid);
  res.send({ status: "success" });
});

export default router;