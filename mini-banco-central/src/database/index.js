import Sequelize from 'sequelize';
import databaseConfig from '../config/database'

import User from '../app/models/User'
import Bank from '../app/models/Bank';
import Account from '../app/models/Account';
import Transaction from '../app/models/Transaction';

const models = [User, Bank, Account, Transaction];

class Database{
    constructor(){
        this.init();
    }
    init() {
        this.connection = new Sequelize(databaseConfig);
      
        models.forEach(model => model.init(this.connection));
      
        models.forEach(model => {
          if (model.associate) {
            model.associate(this.connection.models);
          }
        });
      }
      
}
export default new Database();