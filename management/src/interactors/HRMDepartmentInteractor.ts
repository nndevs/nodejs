import {IHRMDepartmentInteractor} from "../interfaces/IHRMDepartmentInteractor"
import { HRMDepartmentRepository } from "../repositories/HRMDepartmentRepository"
import { HRMDepartment } from "../entities/HRMDepartment"
import { PaginationDataReturnType } from "../common/ts-types"


export class HRMDepartmentInteractor implements IHRMDepartmentInteractor{
    private repository: HRMDepartmentRepository
    constructor(repository: HRMDepartmentRepository){
        this.repository = repository
    }

    async createDepartment(department_data: HRMDepartment): Promise<HRMDepartment> {
        const data = await this.repository.create(department_data)
        return data
    }
    async updateDepartment(id: number, department_data: HRMDepartment): Promise<HRMDepartment>{
        const data = await this.repository.update(id, department_data)
        return data
    }
    async getSingleDepartment(id: number): Promise<HRMDepartment>{
        const data = await this.repository.find(id)
        return data
    }
    async getDepartments(tenant_id: number, limit: number, offset: number, search: string): Promise<PaginationDataReturnType>{
        const data = await this.repository.findAll(tenant_id, limit, offset, search)
        return data
    }
    async destroyDepartment(id: number): Promise<number>{
        const data = await this.repository.delete(id)
        return data
    }
}