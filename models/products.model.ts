import { db } from '../config/db';

interface Product {
	code: number;
	description: string;
	price: number;
	stock: number;
}

interface ProductResponse {
	pages: number;
	totalElements: number;
	values: Product[];
}

interface ProductRequest {
	description: string;
	price: number;
	stock: number;
}

const getallProducts = async (
	page: number,
	size: number,
	description?: string,
	price?: number
): Promise<ProductResponse> => {
	const limit = size;
	const to = (page - 1) * size;
	const whereClauses: string[] = [];
	const values: any[] = [];

	if (description) {
		whereClauses.push(`description LIKE ?`);
		values.push(`%${description}%`);
	}

	if (price !== undefined) {
		whereClauses.push(`price = ?`);
		values.push(price);
	}

	const whereClause =
		whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

	values.push(to, limit);

	const query = `SELECT * FROM products ${whereClause} LIMIT ?, ?`;

	const queryCount = `SELECT COUNT(*) as total FROM products ${whereClause}`;

	const [rows] = await db.execute(query, values);
	const [countResult]: any = await db.execute(queryCount, values.slice(0, -2));
	const products = rows as Product[];
	const totalElements = Number(countResult[0].total || 0);
	const totalPages = Math.ceil(totalElements / size);

	return {
		pages: totalPages,
		totalElements,
		values: products,
	};
};

const createProductdb = async (
	product: Partial<Product>
): Promise<Partial<Product>> => {
	const { description, price, stock } = product;
	const [result] = await db.execute(
		'INSERT INTO products (description, price, stock) VALUES (?, ?, ?)',
		[description, price, stock]
	);
	return { code: (result as any).insertId, description, price, stock };
};

const updateProductdb = async (product: Product): Promise<Product> => {
	const { code, description, price, stock } = product;
	const [result] = await db.execute(
		'UPDATE products SET description = ?, price = ?, stock = ? WHERE code = ?',
		[description, price, stock, code]
	);
	return product;
};

const deleteProductdb = async (
	code: number
): Promise<{ deletedCode: number }> => {
	const [result] = await db.execute('DELETE FROM products WHERE code = ?', [
		code,
	]);
	const response = { deletedCode: code };
	return response;
};

export { getallProducts, updateProductdb, createProductdb, deleteProductdb };
