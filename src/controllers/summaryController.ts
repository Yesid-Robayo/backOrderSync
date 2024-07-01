import { Request, Response } from "express";
import { executeQuery } from "../config/dbConnection";
import { quearySummary } from "../quearys/quearySummary";

export const getNumberOfOrders = async (req: Request, res: Response) => {
    try {
        const orders = await executeQuery(quearySummary.getNumberOfOrders);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getNumberOfCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await executeQuery(quearySummary.getNumberOfCustomers);
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const revenueFromTheLastMonth = async (req: Request, res: Response) => {
    try {
        const revenue = await executeQuery(quearySummary.revenueFromTheLastMonth);
        res.status(200).json(revenue);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const revenueDateAndCountOrders = async (req: Request, res: Response) => {
    try {
        const revenue = await executeQuery(quearySummary.revenueDateAndCountOrders);
        res.status(200).json(revenue);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}
export const citywithMostOrders = async (req: Request, res: Response) => {
    try {
        const city = await executeQuery(quearySummary.citywithMostOrders);
        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const bestSellingProduct = async (req: Request, res: Response) => {
    try {
        const product = await executeQuery(quearySummary.bestSellingProduct);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getNumberOfOrdersRange = async (req: Request, res: Response) => {
    const { start, end } = req.query;
    try {
        const orders = await executeQuery(quearySummary.getNumberOfOrdersRange, [start, end]);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders' });
    }
}