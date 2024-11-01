import { DatabaseConfig } from '../common/ts-types'
require('dotenv').config()


const databaseConfig: DatabaseConfig = {
    db_connection: {
        host_name: process.env.DB_HOST as string,
        db_name: process.env.DB_NAME as string,
        db_user: process.env.DB_USER as string,
        db_password: process.env.DB_PASSWORD,
        db_dialect: process.env.DB_DIALECT
    }
}

export default databaseConfig