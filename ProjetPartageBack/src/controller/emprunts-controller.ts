import { Router } from "express";
import { empruntsRepository } from "../repository/emprunts-repository";
import { checkId } from "../middleware";
import Joi from "joi";

export const empruntsController = Router();

empruntsController.get("/", async (req, res) => {
  const emprunts = await empruntsRepository.findAll();
  res.json(emprunts);
});


empruntsController.get("/:id", checkId, async (req, res) => {
  const emprunts = await empruntsRepository.findById(req.params.id);
  if (!emprunts) {
    res.status(404).end("Not Found");
    return;
  }
  res.json(emprunts);
});

empruntsController.post("/", async (req, res) => {
  const validation = empruntsValidation.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(400).json(validation.error);
    return;
  }
  if (await empruntsRepository.findById(req.body._id)) {
    res.status(400).json({ error: "emprunts existe déjà" });
    return;
  }
  const emprunts = await empruntsRepository.persist(req.body);
  res.status(201).json(emprunts);
});

empruntsController.delete("/:id", checkId, async (req, res) => {
  await empruntsRepository.remove(req.params.id);
  res.status(204).end();
});

empruntsController.patch("/:id", checkId, async (req, res) => {
  const validation = empruntsPatchValidation.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    res.status(400).json(validation.error);
    return;
  }
  await empruntsRepository.update(req.params.id, req.body);
  res.json(req.body);
});

const empruntsValidation = Joi.object({
  message: Joi.string().required(),
  duree: Joi.string().required()
});

const empruntsPatchValidation = Joi.object({
    message: Joi.string(),
  duree: Joi.string()
});