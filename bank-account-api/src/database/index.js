import Sequelize from 'sequelize';
import databaseConfig from '../config/database'

import User from '../app/models/User.js'
import Bank from '../app/models/Bank.js';
import Account from '../app/models/Account.js';
import Transaction from '../app/models/Transaction.js';
import Invoices from '../app/models/Invoices.js';

const models = [Bank, User, Account, Transaction, Invoices];

class Database {
    constructor() {
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
