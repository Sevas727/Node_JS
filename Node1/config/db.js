/**
 * Created by User on 01.02.2017.
 */
import Sequelize from "sequelize";
const sequelize = new Sequelize('db', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 100,
        min: 0,
        idle: 10000
    }
});

export default sequelize;