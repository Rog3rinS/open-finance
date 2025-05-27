import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js';
import User from '../models/user.js';
import Institution from '../models/institution.js';
import Account from '../models/account.js'; 
import Transaction from '../models/transaction.js';

const models = [Institution, User, Account, Transaction];
  
class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(databaseConfig); 

		models.map(model => model.init(this.connection));
		models.map(model => model.associate && model.associate(this.connection.models));
	}

}

export default new Database();