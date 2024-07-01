import { Request, Response } from 'express';
import { executeQuery } from '../config/dbConnection';
import { quearysUser } from '../quearys/quearyUser';

export const getUsersByOffset = async (req: Request, res: Response) => {
    const { page = 1, limit = 10, search = '', city = '' } = req.query;
    try {
        const offset = (parseInt(page.toString()) - 1) * parseInt(limit.toString());
        let queryParams: any[] = [];

        let countQuery = `SELECT COUNT(*) AS total FROM users WHERE 1=1`;
        let query = `SELECT * FROM users WHERE 1=1`;

        // Filtrar por ciudad si se proporciona
        if (city) {
            countQuery += ` AND city LIKE ?`;
            query += ` AND city LIKE ?`;
            queryParams.push(`%${city}%`);
        }

        // Filtrar por nombre o ID dependiendo del tipo de búsqueda
        if (search) {
            if (!isNaN(Number(search))) {
                // Si es numérico, buscar por ID
                countQuery += ` AND id = ?`;
                query += ` AND id = ?`;
                queryParams.push(parseInt(search as string));
            } else {
                // Si no es numérico, buscar por nombre
                const searchTerm = `%${search}%`;
                countQuery += ` AND name LIKE ?`;
                query += ` AND name LIKE ?`;
                queryParams.push(searchTerm);
            }
        }

        // Ejecutar la consulta para obtener el total de usuarios
        const countResult: any = await executeQuery(countQuery, queryParams);
        const totalUsers = countResult[0].total;

        // Añadir limit y offset a la consulta principal
        query += ` LIMIT ? OFFSET ?`;
        queryParams.push(parseInt(limit as string), offset);

        // Ejecutar la consulta para obtener los usuarios de la página actual
        const users = await executeQuery(query, queryParams);

        // Devolver respuesta con usuarios y total de usuarios
        res.status(200).json({ users, totalUsers });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await executeQuery(quearysUser.getAllUsers);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.error('Error fetching users:', error);
    }

}

export const getCitys = async (req: Request, res: Response) => {
    try {
        const citys = await executeQuery(quearysUser.getCitys);
        res.status(200).json(citys);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

}

export const addUser = async (req: Request, res: Response) => {
    try {
        const { name, phone, email, address, city } = req.body;
        await executeQuery(quearysUser.adduser, [name, phone, email, address, city]);
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await executeQuery(quearysUser.getUserById, [id]);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, phone, email, address, city } = req.body;
        await executeQuery(quearysUser.updateUser, [name, phone, email, address, city, id]);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await executeQuery(quearysUser.deleteUser, [id]);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
