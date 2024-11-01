import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database'
import configApp from '../config/app'

const sequelizeConnection = new Sequelize(databaseConfig.db_connection.db_name, databaseConfig.db_connection.db_user, databaseConfig.db_connection.db_password, {
    host: databaseConfig.db_connection.host_name,
    dialect: databaseConfig.db_connection.db_dialect,
    timezone: configApp.default_timezone,
    logging:false
});

// try {
//     sequelizeConnection.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

export default sequelizeConnection