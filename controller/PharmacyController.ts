import { Request, Response } from "express";
import PharmacyService from "../services/PharmacyService";


class PharmacyController {
  private pharmacyService = new PharmacyService();

  async getAll(req: Request, res: Response) {
    console.log("PharmacyController get all");

    try {
      const pharmacies = await this.pharmacyService.getAll();
      res.send({ status: "OK", data: pharmacies });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
  }

  async getById(req: Request, res: Response) {
    console.log("PharmacyController get by id");

    try {
      const pharmacy = await this.pharmacyService.getById(Number(req.params.id));
      res.send({ status: "OK", data: pharmacy });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
  }

  async create(req: Request, res: Response) {
    console.log("PharmacyController create");

    try {
      const pharmacy = await this.pharmacyService.create(req.body);
      res.send({ status: "OK", data: pharmacy });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
  }

  async update(req: Request, res: Response) {
    console.log("PharmacyController update");

    try {
      const pharmacy = await this.pharmacyService.update(Number(req.params.id), req.body);
      res.send({ status: "OK", data: pharmacy });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
  }

  async delete(req: Request, res: Response) {
    console.log("PharmacyController delete");

    try {
      const pharmacy = await this.pharmacyService.delete(Number(req.params.id));
      res.send({ status: "OK", data: pharmacy });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
  }
}

export default PharmacyController;
