import { Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel from "../models/order.model";

export const newOrder = CatchAsyncError(async (data: any, res: Response, next: NextFunction) => {
    try {
        const order = await OrderModel.create(data);
        res.status(200).json({
            success: true,
            order,
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// get all orders
export const getAllOrdersService = async (res: Response) => {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        orders,
    });
};