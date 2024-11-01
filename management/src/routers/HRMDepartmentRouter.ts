import express, { Express } from "express";

import { HRMDepartmentController } from "../controllers/HRMDepartmentController"
import { HRMDepartmentRepository } from "../repositories/HRMDepartmentRepository"
import { HRMDepartmentInteractor } from "../interactors/HRMDepartmentInteractor"
import departmentInputValidate from "../validations/department"

const repository = new HRMDepartmentRepository()
const interactor = new HRMDepartmentInteractor(repository)

const controller = new HRMDepartmentController(interactor)

const router = express.Router()
router.post('/hrm/department', departmentInputValidate, controller.onCreateDepartment.bind(controller))
router.put('/hrm/department/:id', departmentInputValidate, controller.onUpdateDepartment.bind(controller))
router.get('/hrm/department/:id', controller.onGetSingleDepartment.bind(controller))
router.get('/hrm/departments', controller.onGetDepartments.bind(controller))
router.delete('/hrm/department/:id', controller.onDeleteDepartment.bind(controller))

export default router

