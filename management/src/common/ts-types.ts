import { DatabaseConnection } from './ts-interfaces'

export type DatabaseConfig = {
    db_connection: DatabaseConnection
}

export type PaginationDataReturnType = {
    count: number,
    rows: object
}