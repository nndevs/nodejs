export interface AppConfig {
    server_port: number,
    environment: string,
    default_timezone: any,
    api_version: string
}

export interface DatabaseConnection {
    host_name: string,
    db_name: string,
    db_user: string,
    db_password: any,
    db_dialect: any
}