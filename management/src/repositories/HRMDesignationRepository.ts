import { PaginationDataReturnType } from "../common/ts-types";
import { HRMDesignation } from "../entities/HRMDesignation";
import { IHRMDesignationRepository } from "../interfaces/IHRMDesignationRepository";
import { AppError } from "../common/appError"
import HRMDesignationModel from "../models/hrmdesignation"
import { Op } from "sequelize";

export class HRMDesignationRepository implements IHRMDesignationRepository{
    async create(data: HRMDesignation): Promise<HRMDesignation> {
        try{
            const designation = await HRMDesignationModel.create(data)
            if(!designation){
                throw new AppError('Designation not found', 404)    
            }
            
            return designation
        } catch(error: any){
            if(typeof error.statusCode !== "undefined"){
                throw new AppError(`${error.message}`, Number(error.statusCode))
            }
            throw new AppError('Designation not found', 404)
        }
    }
    async update(id: number, data: HRMDesignation): Promise<HRMDesignation> {
        try{
            const designation = await HRMDesignationModel.findByPk(id)
            if(!designation){
                throw new AppError('Designation not found', 404)
            }

            //
            await designation.update(data)
            return designation

        } catch(error: any){
            if(typeof error.statusCode !== "undefined"){
                throw new AppError(`${error.message}`, Number(error.statusCode))
            }
            throw new AppError('Designation not found', 404)
        }
    }
    async find(id: number): Promise<HRMDesignation> {
        try {
            const designation = await HRMDesignationModel.findByPk(id)
            if(!designation){
                throw new AppError('Designation not found', 404)
            }

            //
            return designation
        } catch (error: any) {
            if(typeof error.statusCode !== "undefined"){
                throw new AppError(`${error.message}`, Number(error.statusCode))
            }
            throw new AppError('Designation not found', 404)
        }
    }
    async findAll(tenant_id: number, limit: number, offset: number, search: string): Promise<PaginationDataReturnType> {
        try {
            const { count, rows } = await HRMDesignationModel.findAndCountAll({
                where: {
                    tenant_id,
                    name: {
                        [Op.iLike]: `%${search}%`,
                    },
                },
                order: [['id', 'DESC']],
                offset: offset,
                limit: limit,
            });

            return { count: count, rows: rows }
        } catch (error: any) {
            if(typeof error.statusCode !== "undefined"){
                throw new AppError(`${error.message}`, Number(error.statusCode))
            }
            throw new AppError('Designation not found', 404)
        }
    }
    async delete(id: number): Promise<number> {
        try {
            const designation = await HRMDesignationModel.destroy({
                where: { id: id },
            });

            if(!designation){
                throw new AppError('Designation not found', 404)
            }

            return designation
            
        } catch (error: any) {
            if(typeof error.statusCode !== "undefined"){
                throw new AppError(`${error.message}`, Number(error.statusCode))
            }
            throw new AppError('Designation not found', 404)
        }
    }
}