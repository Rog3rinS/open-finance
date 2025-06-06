import { Sequelize } from 'sequelize';
import databaseConfig from './databaseConfig.js';

const sequelize = new Sequelize(
    databaseConfig.database,
    databaseConfig.username,
    databaseConfig.password,
    {
        host: databaseConfig.host,
        port: Number(databaseConfig.port),
        dialect: databaseConfig.dialect,
        define: databaseConfig.define,
        logging: false,
    }
);

export default sequelize;
