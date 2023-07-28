import { Router } from "express";
import { annoncesRepository } from "../repository/annonces-repository";
import { checkId } from "../middleware";
import Joi from "joi";

export const annoncesController = Router();

annoncesController.get("/", async (req, res) => {
  const annonces = await annoncesRepository.findAll();
  res.json(annonces);
});

annoncesController.post('/annoncesSearch',async (req,res)=>{
    const annonces = await annoncesRepository.findByEverything(req.body.search);
    res.json(annonces);
})

annoncesController.get("/id/:id", checkId, async (req, res) => {
  const annonces = await annoncesRepository.findById(req.params.id);
  if (!annonces) {
    res.status(404).end("Not Found");
    return;
  }
  res.json(annonces);
});

annoncesController.post("/", async (req, res) => {
  const validation = annoncesValidation.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    res.status(400).json(validation.error);
    return;
  }
  if (await annoncesRepository.findById(req.body._id)) {
    res.status(400).json({ error: "annonce existe deja" });
    return;
  }
  const annonce = await annoncesRepository.persist(req.body);
  res.status(201).json(annonce);
});

annoncesController.delete("/:id", checkId, async (req, res) => {
  await annoncesRepository.remove(req.params.id);
  res.status(204).end();
});

annoncesController.patch("/:id", checkId, async (req, res) => {
  const validation = annoncesPatchValidation.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    res.status(400).json(validation.error);
    return;
  }
  await annoncesRepository.update(req.params.id, req.body);
  res.json(req.body);
});

const annoncesValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  type: Joi.string().required(),
  owner: Joi.object({
    _id: Joi.any().required(),
    name: Joi.string().required(),
    address: Joi.string().required()
}).required()
});

const annoncesPatchValidation = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  status: Joi.string(),
  type: Joi.string(),
  owner: Joi.object({
    _id: Joi.any(),
    name: Joi.string(),
    address: Joi.string()
})
});



