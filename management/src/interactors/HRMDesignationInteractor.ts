import { IHRMDesignationInteractor } from "../interfaces/IHRMDesignationInteractor"
import { HRMDesignationRepository } from "../repositories/HRMDesignationRepository"
import { HRMDesignation } from "../entities/HRMDesignation"
import { PaginationDataReturnType } from "../common/ts-types"

export class HRMDesignationInteractor implements IHRMDesignationInteractor{
    private repository: HRMDesignationRepository
    constructor(repository: HRMDesignationRepository){
        this.repository = repository
    }

    async createDesignation(designation_data: HRMDesignation): Promise<HRMDesignation> {
        const data = await this.repository.create(designation_data)
        return data
    }
    async updateDesignation(id: number, designation_data: HRMDesignation): Promise<HRMDesignation> {
        const data = await this.repository.update(id, designation_data)
        return data
    }
    async getSingleDesignation(id: number): Promise<HRMDesignation> {
        const data = await this.repository.find(id)
        return data
    }
    async getDesignations(tenant_id: number, limit: number, offset: number, search: string): Promise<PaginationDataReturnType> {
        const data = await this.repository.findAll(tenant_id, limit, offset, search)
        return data
    }
    async destroyDesignation(id: number): Promise<number> {
        const data = await this.repository.delete(id)
        return data
    }
}
