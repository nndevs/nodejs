import { AppError } from "../common/appError"
import { HRMDepartment } from "../entities/HRMDepartment"
import { IHRMDepartmentRepository } from "../interfaces/IHRMDepartmentRepository"
import HRMDepartmentModel from "../models/hrmdepartment"
import { Op } from "sequelize";
import { PaginationDataReturnType } from "../common/ts-types"

export class HRMDepartmentRepository implements IHRMDepartmentRepository{
    async create(data: HRMDepartment): Promise<HRMDepartment> {
        try{
            const department = await HRMDepartmentModel.create(data)
            if(!department){
                throw new AppError('Department not found', 404)    
            }
            
            return department
        } catch(error: any){
            if(typeof error.statusCode !== "undefined"){
                throw new AppError(`${error.message}`, Number(error.statusCode))
            }
            throw new AppError('Department not found', 404)
        }
    }
    async update(id: number, data: HRMDepartment): Promise<HRMDepartment> {
        try{
            const department = await HRMDepartmentModel.findByPk(id)
            if(!department){
                throw new AppError('Department not found', 404)
            }

            //
            await department.update(data)
            return department

        } catch(error: any){
            if(typeof error.statusCode !== "undefined"){
                throw new AppError(`${error.message}`, Number(error.statusCode))
            }
            throw new AppError('Department not found', 404)
        }
    }
    async find(id: number): Promise<HRMDepartment> {
        try {
            const department = await HRMDepartmentModel.findByPk(id)
            if(!department){
                throw new AppError('Department not found', 404)
            }

            //
            return department
        } catch (error: any) {
            if(typeof error.statusCode !== "undefined"){
                throw new AppError(`${error.message}`, Number(error.statusCode))
            }
            throw new AppError('Department not found', 404)
        }
    }
    async findAll (tenant_id: number, limit: number, offset: number, search: string): Promise<PaginationDataReturnType> {
        try {
            const { count, rows } = await HRMDepartmentModel.findAndCountAll({
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
            throw new AppError('Department not found', 404)
        }
    }
    async delete(id: number): Promise<number> {
        try {
            const department = await HRMDepartmentModel.destroy({
                where: { id: id },
            });

            if(!department){
                throw new AppError('Department not found', 404)
            }

            return department
            
        } catch (error: any) {
            if(typeof error.statusCode !== "undefined"){
                throw new AppError(`${error.message}`, Number(error.statusCode))
            }
            throw new AppError('Department not found', 404)
        }
    }
}
