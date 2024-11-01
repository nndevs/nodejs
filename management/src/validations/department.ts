import { NextFunction, Request, Response } from "express";
import Joi from 'joi';

import { AppError } from "../common/appError";

const departmentInputValidationSchema = Joi.object({
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
        'string.base': 'Department name must be a string',
        'string.empty': 'Department name cannot be empty',
        'any.required': 'Department name is required'
    }),
    description: Joi.string()
    .optional()
    .messages({
        'string.base': 'Description must be a string',
    }),
    parent_id: Joi.number()
    .integer()
    .optional()
    .messages({
        'number.base': 'Department parent must be a number',
        'number.integer': 'Department parent must be a integer'
    }),
});

const departmentInputValidate = (req: Request, res: Response, next: NextFunction) => {
    const { error } = departmentInputValidationSchema.validate(req.body);
    if (error) {
        return next(new AppError(`Bad Request: ${error.details[0].message}`, 400))
    }
    next();
};

export default departmentInputValidate