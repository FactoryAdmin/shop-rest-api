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

const getallProducts = async (
	page: number,
	size: number
): Promise<ProductResponse> => {
	const limit = size;
	const to = (page - 1) * size;
	const [rows] = await db.execute(`SELECT * FROM products LIMIT ?, ?`, [
		to,
		limit,
	]);
	const [countResult]: any = await db.execute(
		'SELECT count(*) as total FROM products'
	);
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
