import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

import configApp from "./config/app";
import { AppError } from "./common/appError";
import { errorMiddleware } from "./middlewares/errorMiddleware"
import { eurekaClient } from "./common/eurekaClient"

import hrmDepartmentRouter from "./routers/HRMDepartmentRouter"
import hrmDesignationRouter from "./routers/HRMDesignationRouter"
import hrmAttendanceRouter from "./routers/HRMAttendanceRouter"

const app: Express = express()
const port: number = configApp.server_port

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

// Start the Eureka client
// eurekaClient.start((error: any) => {
//     if (error) {
//       console.error('Error starting Eureka client:', error);
//     } else {
//       console.log('Eureka client started successfully');
//     }
// });

app.use(hrmDepartmentRouter)
app.use(hrmDesignationRouter)
app.use(hrmAttendanceRouter)

//Error handling
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new AppError(`Can't find ${req.originalUrl} on the server!`, 404);
    return next(err);
});

app.use(errorMiddleware)

//
app.listen(port, () => {
    console.log(`Management server running at ${port}`)
})