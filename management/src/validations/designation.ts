import { NextFunction, Request, Response } from "express";
import Joi from 'joi';

import { AppError } from "../common/appError";

const designationInputValidationSchema = Joi.object({
    tenant_id: Joi.number()
    .integer()
    .required()
    .messages({
        'number.base': 'Tenant id must be a number',
        'number.integer': 'Tenant id must be a integer',
        'number.empty': 'Tenant id cannot be empty',
        'any.required': 'Tenant id is required'
    }),
    name: Joi.string()
    .required()
    .messages({
        'string.base': 'Designation name must be a string',
        'string.empty': 'Designation name cannot be empty',
        'any.required': 'Designation name is required'
    }),
    department_id: Joi.number()
    .integer()
    .required()
    .messages({
        'number.base': 'Department id must be a number',
        'number.integer': 'Department id must be a integer',
        'number.empty': 'Department id cannot be empty',
        'any.required': 'Department id is required'
    }),
    description: Joi.string()
    .optional()
    .messages({
        'string.base': 'Description must be a string',
    })
});

const designationInputValidate = (req: Request, res: Response, next: NextFunction) => {
    const { error } = designationInputValidationSchema.validate(req.body);
    if (error) {
        return next(new AppError(`Bad Request: ${error.details[0].message}`, 400))
    }
    next();
};

export default designationInputValidate