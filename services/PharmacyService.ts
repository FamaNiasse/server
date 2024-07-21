import AppDataSource from "../data.source";
import { Pharmacy } from "../entities/PharmacyEntity";

class PharmacyService {
  private pharmacyRepository = AppDataSource.getRepository(Pharmacy);

  async getAll() {
    console.log("PharmacyService get all");
    return this.pharmacyRepository.find();
  }

  async getById(id: number) {
    console.log("PharmacyService get by id");
    return this.pharmacyRepository.findOne({ where: { id } });
  }

  async create(pharmacyData: Partial<Pharmacy>) {
    console.log("PharmacyService create");
    const newPharmacy = this.pharmacyRepository.create(pharmacyData);
    return this.pharmacyRepository.save(newPharmacy);
  }

  async update(id: number, pharmacyData: Partial<Pharmacy>) {
    console.log("PharmacyService update");
    await this.pharmacyRepository.update(id, pharmacyData);
    return this.pharmacyRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    console.log("PharmacyService delete");
    const pharmacyToDelete = await this.pharmacyRepository.findOne({ where: { id } });
    if (pharmacyToDelete) {
      await this.pharmacyRepository.remove(pharmacyToDelete);
      return pharmacyToDelete;
    }
    return null;
  }
}

export default PharmacyService;
