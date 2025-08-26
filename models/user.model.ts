import { db } from '../config/db';

interface User {
	id: number;
	name: string;
	email: string;
	role: string;
	password: string;
}

const findUserByEmail = async (email: string) => {
	try {
		const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [
			email,
		]);
		const users = rows as User[];
		return users.length ? users[0] : null;
	} catch (error) {
		throw new Error('Error al conectar con la base de datos');
	}
};

const createUser = async (user: Partial<User>) => {
	try {
		const { name, email, role, password } = user;
		const [result] = await db.execute(
			'INSERT INTO users (name, email, role, password) VALUES (?, ?, ?, ?)',
			[name, email, role, password]
		);
		const insertId = (result as any).insertId;
		return { id: insertId, email, password } as User;
	} catch (error) {
		throw new Error('Error al crear el usuario en la base de datos');
	}
};

export { findUserByEmail, createUser };
