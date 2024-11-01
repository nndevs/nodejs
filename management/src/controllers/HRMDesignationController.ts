import { Request, Response, NextFunction } from "express";

import { IHRMDesignationInteractor } from "../interfaces/IHRMDesignationInteractor";
import { AppError } from "../common/appError";
import { successResponse } from "../common/successResponse"
import { paginationPageSize } from "../common/utils"

export class HRMDesignationController{
    private dInteractor: IHRMDesignationInteractor

    constructor(dInteractor: IHRMDesignationInteractor){
        this.dInteractor = dInteractor
    }

    async OnCreateDesignation(req: Request, res: Response, next: NextFunction){
        try{
            const body = req.body
            const data = await this.dInteractor.createDesignation(body)

            return successResponse(res, 200, data, 'Created designation data')
        } catch(error: any){
            return next(new AppError(`${error.message}`, Number(error.statusCode)))
        }
    }

    async onUpdateDesignation(req: Request, res:Response, next:NextFunction){
        try{
            const id = Number(req.params.id)
            const data = await this.dInteractor.updateDesignation(id, req.body)

            return successResponse(res, 200, data, 'Updated designation data')
        } catch(error: any){
            return next(new AppError(`${error.message}`, Number(error.statusCode)))
        }
    }

    async onGetSingleDesignation(req: Request, res: Response, next:NextFunction){
        try {
            const id = Number(req.params.id)
            const data = await this.dInteractor.getSingleDesignation(id)
            
            return successResponse(res, 200, data, 'Single designation data')
        } catch (error: any) {
            return next(new AppError(`${error.message}`, Number(error.statusCode)))
        }
    }

    async onGetDesignations(req: Request, res: Response, next: NextFunction){
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
            const data = await this.dInteractor.getDesignations(tenant_id, limit, offset, search)

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
                'Designation data'
            )
            
        } catch (error: any) {
            return next(new AppError(`${error.message}`, Number(error.statusCode)))
        }
    }

    async onDeleteDesignation(req: Request, res: Response, next: NextFunction){
        try {
            const id : number = Number(req.params.id)
            const data = await this.dInteractor.destroyDesignation(id)

            return successResponse(res, 200, data, 'Selected designation deleted')
        } catch (error: any) {
            return next(new AppError(`${error.message}`, Number(error.statusCode)))
        }
    }
}