import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
	static init(sequelize) {
		super.init({
			name: Sequelize.STRING,
			email: Sequelize.STRING,
			password: Sequelize.STRING,
			cpf: Sequelize.STRING
		},{sequelize});

		this.addHook('beforeSave', async (User) => {
			User.password = await bcrypt.hash(User.password, 6);
		});

		return this;
	}

	checkPassword(password) {
		return bcrypt.compare(password, this.password);
	}
}

export default User;
