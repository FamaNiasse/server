import { Request, Response } from 'express';
import NeedsService from '../services/NeedService';


class NeedsController {
  private needsService = new NeedsService();

  async getAll(req: Request, res: Response) {
    console.log('NeedsController get all');

    try {
      const needs = await this.needsService.getAll();
      res.send({ status: 'OK', data: needs });
    } catch (error) {
      res.status(500).send({ status: 'Failed', message: error });
    }
  }

  async getById(req: Request, res: Response) {
    console.log('NeedsController get by id');

    try {
      const need = await this.needsService.getById(Number(req.params.id));
      res.send({ status: 'OK', data: need });
    } catch (error) {
      res.status(500).send({ status: 'Failed', message: error });
    }
  }

  async create(req: Request, res: Response) {
    console.log('NeedsController create');

    try {
      const need = await this.needsService.create(req.body);
      res.send({ status: 'OK', data: need });
    } catch (error) {
      res.status(500).send({ status: 'Failed', message: error });
    }
  }

  async update(req: Request, res: Response) {
    console.log('NeedsController update');

    try {
      const need = await this.needsService.update(Number(req.params.id), req.body);
      res.send({ status: 'OK', data: need });
    } catch (error) {
      res.status(500).send({ status: 'Failed', message: error });
    }
  }

  async delete(req: Request, res: Response) {
    console.log('NeedsController delete');

    try {
      const result = await this.needsService.delete(Number(req.params.id));
      res.send({ status: 'OK', data: result });
    } catch (error) {
      res.status(500).send({ status: 'Failed', message: error });
    }
  }

  async getProductsByNeed(req: Request, res: Response) {
    console.log("NeedsController get products by need");
    try {
        const { id } = req.params;
        const products = await this.needsService.getProductsByNeed(Number(id));
        res.send({ status: "OK", data: products });
    } catch (error) {
        res.status(500).send({ status: "Failed", message: error });
    }
}
}




export default NeedsController;

