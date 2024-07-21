import { Router } from "express";
import PharmacyController from "../controller/PharmacyController";


const pharmacyRouter = Router();
const pharmacyController = new PharmacyController();

// GetAll
pharmacyRouter.get("/", (req, res) => {
    console.log("PharmacyRouter get all");
    pharmacyController.getAll(req, res);
});

// GetById
pharmacyRouter.get("/:id", (req, res) => {
    console.log("PharmacyRouter get by id");
    pharmacyController.getById(req, res);
});

// Create
pharmacyRouter.post("/", (req, res) => {
    console.log("PharmacyRouter create");
    pharmacyController.create(req, res);
});

// Put
pharmacyRouter.put("/:id", (req, res) => {
    console.log("PharmacyRouter update");
    pharmacyController.update(req, res);
});

// Delete
pharmacyRouter.delete("/:id", (req, res) => {
    console.log("PharmacyRouter delete");
    pharmacyController.delete(req, res);
});

// on exporte pour qu'il puisse être appelé par index.ts
export default pharmacyRouter;
