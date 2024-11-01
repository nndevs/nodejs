import { HRMDepartment } from "../entities/HRMDepartment";
import { PaginationDataReturnType } from "../common/ts-types"

export interface IHRMDepartmentRepository{
    create(data: HRMDepartment): Promise<HRMDepartment>
    update(id: number, data: HRMDepartment): Promise<HRMDepartment>
    find(id: number): Promise<HRMDepartment>
    findAll(tenant_id: number, limit: number, offset: number, search: string): Promise<PaginationDataReturnType>
    delete(id: number): Promise<number>
}