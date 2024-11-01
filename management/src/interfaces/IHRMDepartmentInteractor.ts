import { HRMDepartment } from "../entities/HRMDepartment";
import { PaginationDataReturnType } from "../common/ts-types"

export interface IHRMDepartmentInteractor{
    createDepartment(department_data: HRMDepartment): Promise<HRMDepartment>,
    updateDepartment(id: number, department_data: HRMDepartment): Promise<HRMDepartment>,
    getSingleDepartment(id: number): Promise<HRMDepartment>,
    getDepartments(tenant_id: number, limit: number, offset: number, search: string): Promise<PaginationDataReturnType>,
    destroyDepartment(id: number): Promise<number>
}