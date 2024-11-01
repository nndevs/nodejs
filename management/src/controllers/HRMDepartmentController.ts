import { NextFunction, Request, Response } from "express";

import { IHRMDepartmentInteractor } from "../interfaces/IHRMDepartmentInteractor";
import { AppError } from "../common/appError";
import { successResponse } from "../common/successResponse"
import { paginationPageSize } from "../common/utils"

export class HRMDepartmentController{
    private dInteractor: IHRMDepartmentInteractor

    constructor(dInteractor: IHRMDepartmentInteractor){
        this.dInteractor = dInteractor
    }

    async onCreateDepartment(req: Request, res: Response, next: NextFunction){
        try{
            const body = req.body
            const data = await this.dInteractor.createDepartment(body)

            return successResponse(res, 200, data, 'Created department data')
        } catch(error: any){
            return next(new AppError(`${error.message}`, Number(error.statusCode)))
        }
    }

    async onUpdateDepartment(req: Request, res:Response, next:NextFunction){
        try{
            const id = Number(req.params.id)
            const data = await this.dInteractor.updateDepartment(id, req.body)

            return successResponse(res, 200, data, 'Updated department data')
        } catch(error: any){
            return next(new AppError(`${error.message}`, Number(error.statusCode)))
        }
    }

    async onGetSingleDepartment(req: Request, res: Response, next:NextFunction){
        try {
            const id = Number(req.params.id)
            const data = await this.dInteractor.getSingleDepartment(id)
            
            return successResponse(res, 200, data, 'Single department data')
        } catch (error: any) {
            return next(new AppError(`${error.message}`, Number(error.statusCode)))
        }
    }

    async onGetDepartments(req: Request, res: Response, next: NextFunction){
        try {
            const tenant_id: number = Number(req.body.tenant_id) 
            const page: number = Number(req.query.page) || 1
            const limit: number = Number(req.query.limit) || paginationPageSize
            const search: any = req.query.search || ''

            //
            if(!tenant_id || isNaN(tenant_id)){
                return next(new AppError('Bad Request: Tenant id cannot be empty', 400))
            }

            const offset = (page - 1) * limit
            const data = await this.dInteractor.getDepartments(tenant_id, limit, offset, search)

            //
            return successResponse(
                res,
                200,
                {
                    total: data.count,
                    totalPages: Math.ceil(data.count / limit),
                    currentPage: Number(page),
                    departments: data.rows,
                },
                'Departments data'
            )
            
        } catch (error: any) {
            return next(new AppError(`${error.message}`, Number(error.statusCode)))
        }
    }

    async onDeleteDepartment(req: Request, res: Response, next: NextFunction){
        try {
            const id : number = Number(req.params.id)
            const data = await this.dInteractor.destroyDepartment(id)

            return successResponse(res, 200, data, 'Selected department deleted')
        } catch (error: any) {
            return next(new AppError(`${error.message}`, Number(error.statusCode)))
        }
    }
} 