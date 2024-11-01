import { HRMDesignation } from "../entities/HRMDesignation"
import { PaginationDataReturnType } from "../common/ts-types"

export interface IHRMDesignationInteractor{
    createDesignation(designation_data: HRMDesignation): Promise<HRMDesignation>,
    updateDesignation(id: number, designation_data: HRMDesignation): Promise<HRMDesignation>,
    getSingleDesignation(id: number): Promise<HRMDesignation>,
    getDesignations(tenant_id: number, limit: number, offset: number, search: string): Promise<PaginationDataReturnType>,
    destroyDesignation(id: number): Promise<number>
}