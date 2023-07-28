import { Router } from "express";
import { usersRepository } from "../repository/users-repository";
import { checkId } from "../middleware";
import Joi from "joi";

export const usersController = Router();

usersController.get("/", async (req, res) => {
  const users = await usersRepository.findAll();
  res.json(users);
});

usersController.get("/:name", async (req, res) => {
  const users = await usersRepository.findByName(req.params.name);
  if (!users) {
    res.status(404).end("Not Found");
    return;
  }
  res.json(users);
});

usersController.post("/", async (req, res) => {
  const validation = usersValidation.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(400).json(validation.error);
    return;
  }
  if (await usersRepository.findByName(req.body.name)) {
    res.status(400).json({ error: "User existe deja" });
    return;
  }
  req.body.role = "roleUser";
  const users = await usersRepository.persist(req.body);
  res.status(201).json(users);
});

usersController.delete("/:id", checkId, async (req, res) => {
  await usersRepository.remove(req.params.id);
  res.status(204).end();
});

usersController.patch("/:id", checkId, async (req, res) => {
  const validation = usersPatchValidation.validate(req.body, {
    abortEarly:false,
  });
  if (validation.error) {
    res.status(400).json(validation.error);
    return;
  }
  await usersRepository.update(req.params.id, req.body);
  res.json(req.body);
});

const usersValidation = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().required(),
  address: Joi.string().required(),
});

const usersPatchValidation = Joi.object({
  name: Joi.string(),
  role: Joi.string(),
  address: Joi.string()
});