import { AppConfig } from "../common/ts-interfaces"
require('dotenv').config()


const configApp: AppConfig = {
    server_port: Number(process.env.SERVER_PORT),
    environment: process.env.APP_ENV as string,
    default_timezone: process.env.DEFAULT_TIMEZONE,
    api_version: 'v1-2024-10'
}

export default configApp