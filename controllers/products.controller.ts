import { Request, Response } from 'express';
import {
	createProductdb,
	deleteProductdb,
	getallProducts,
	updateProductdb,
} from '../models/products.model';

const getProducts = async (req: Request, res: Response) => {
	const { page, size, description, price } = req.query;

	try {
		const products = await getallProducts(
			Number(page || 1),
			Number(size || 10),
			description as string,
			price ? Number(price) : undefined
		);
		if (!products) {
			return res.status(404).json({ message: 'No hay productos disponibles' });
		}
		return res.status(200).json(products);
	} catch (error) {
		return res.status(500).json({
			message: 'Error del servidor: no se pudo acceder a la base de datos',
		});
	}
};

const updateProduct = async (req: Request, res: Response) => {
	try {
		const { code } = req.params;
		const { description, price, stock } = req.body;
		const update = await updateProductdb({
			code: Number(code),
			description,
			price,
			stock,
		});
		if (!update) {
			return res
				.status(404)
				.json({ message: 'No se pudo actualizar el producto' });
		}
		return res.status(200).json(update);
	} catch (error) {
		return res.status(500).json({
			message: 'Error del servidor: no se pudo acceder a la base de datos',
		});
	}
};

const createProduct = async (req: Request, res: Response) => {
	try {
		const { description, price, stock } = req.body;
		const product = await createProductdb({ description, price, stock });
		if (!product) {
			return res.status(404).json({ message: 'No se pudo crear el producto' });
		}
		return res.status(200).json(product);
	} catch (error) {
		return res.status(500).json({
			message: 'Error del servidor: no se pudo acceder a la base de datos',
		});
	}
};

const deleteProduct = async (req: Request, res: Response) => {
	try {
		const { code } = req.params;
		const product = await deleteProductdb(Number(code));
		if (!product) {
			return res
				.status(404)
				.json({ message: 'No se pudo eliminar el producto' });
		}
		return res.status(200).json({ status: 'success', ...product });
	} catch (error) {
		return res.status(500).json({
			message: 'Error del servidor: no se pudo acceder a la base de datos',
		});
	}
};

export { getProducts, updateProduct, createProduct, deleteProduct };
