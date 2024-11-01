import { Response } from "express";

import configApp from "../config/app"

export const successResponse = (res: Response, statusCode: number, payload = {}, message = "") => {
    return res.status(statusCode).json({
        status: "success",
        statusCode: statusCode,
        payload: payload,
        message: message,
        apiVersion : configApp.api_version,
        author : "nndevs"
    });
}