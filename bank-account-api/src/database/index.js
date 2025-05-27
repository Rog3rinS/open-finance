import { Sequelize } from 'sequelize';

import database from '../config/database.js';
import Account from '../app/model/Account.js';
import Institution from '../app/model/Institution.js';
import Transaction from '../app/model/Transaction.js';
import User from '../app/model/User.js';

const models = [Account, Institution, Transaction, User];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(database);

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();
