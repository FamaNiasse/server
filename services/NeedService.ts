import AppDataSource from "../data.source";
import { Needs } from "../entities/NeedsEntity";


class NeedsService {
  private needRepository = AppDataSource.getRepository(Needs);

  async getAll() {
    return await this.needRepository.find();
  }

  async getById(id: number) {
    return await this.needRepository.findOne({where: {id}});
  }

  async create(needData: Partial<Needs>) {
    const need = this.needRepository.create(needData);
    return await this.needRepository.save(need);
  }

  async update(id: number, needData: Partial<Needs>) {
    await this.needRepository.update(id, needData);
    return await this.needRepository.findOne({where: {id}});
  }

  async delete(id: number) {
    await this.needRepository.delete(id);
    return { deleted: true };
  }


  async getProductsByNeed(needId: number) {
    const need = await this.needRepository.findOne({
      where: { id: needId },
      relations: ["products"],
    });

    if (!need) {
      throw new Error("Need not found");
    }

    return need.products;
  }
  
}

export default NeedsService;
