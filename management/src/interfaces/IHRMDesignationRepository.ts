import { HRMDesignation } from "../entities/HRMDesignation";
import { PaginationDataReturnType } from "../common/ts-types"

export interface IHRMDesignationRepository{
    create(data: HRMDesignation): Promise<HRMDesignation>
    update(id: number, data: HRMDesignation): Promise<HRMDesignation>
    find(id: number): Promise<HRMDesignation>
    findAll(tenant_id: number, limit: number, offset: number, search: string): Promise<PaginationDataReturnType>
    delete(id: number): Promise<number>
}