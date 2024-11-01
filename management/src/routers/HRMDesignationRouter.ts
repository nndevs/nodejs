import express, { Express } from "express";

import { HRMDesignationController } from "../controllers/HRMDesignationController"
import { HRMDesignationRepository } from "../repositories/HRMDesignationRepository"
import { HRMDesignationInteractor } from "../interactors/HRMDesignationInteractor";
import designationInputValidate from "../validations/designation"


const repository = new HRMDesignationRepository()
const interactor = new HRMDesignationInteractor(repository)

const controller = new HRMDesignationController(interactor)

const router = express.Router()
router.post('/hrm/designation', designationInputValidate, controller.OnCreateDesignation.bind(controller))
router.put('/hrm/designation/:id', designationInputValidate, controller.onUpdateDesignation.bind(controller))
router.get('/hrm/designation/:id', controller.onGetSingleDesignation.bind(controller))
router.get('/hrm/designations', controller.onGetDesignations.bind(controller))
router.delete('/hrm/designation/:id', controller.onDeleteDesignation.bind(controller))

export default router