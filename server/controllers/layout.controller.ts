import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import LayoutModel from "../models/layout.model";
import cloudinary from 'cloudinary';

// create lauout 
export const createLayout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body;

        const isTypeExist = await LayoutModel.findOne({ type });
        if (isTypeExist) {
            return next(new ErrorHandler(`${type} already exist`, 400));
        }

        if (type === "Banner") {
            const { type, image, title, subTitle } = req.body;
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "layout"
            });

            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
                title,
                subTitle
            };

            await LayoutModel.create({ type, banner });
        }

        if (type === "FAQ") {
            const { type, faq } = req.body;
            await LayoutModel.create({ type, faq });
        }

        if (type === "Categories") {
            const { type, categories } = req.body;
            await LayoutModel.create({ type, categories });
        }

        res.status(201).json({
            success: true,
            message: "Layout created successfully",
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// edit layout
export const editLayout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body;

        if (type === "Banner") {
            const bannerDate: any = await LayoutModel.findOne({ type: "Banner" });
            const { type, image, title, subTitle } = req.body;
            if (bannerDate) {
                await cloudinary.v2.uploader.destroy(bannerDate.banner.image.public_id);
            }
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "layout"
            });
            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
                title,
                subTitle,
            };
            await LayoutModel.findByIdAndUpdate(bannerDate?._id, { type, banner }, { new: true });
        }

        if (type === "FAQ") {
            const { type, faq } = req.body;
            const FaqItem = await LayoutModel.findOne({ type: "FAQ" });
            await LayoutModel.findByIdAndUpdate(FaqItem?._id, { type, faq }, { new: true });
        }

        if (type === "Categories") {
            const { type, categories } = req.body;
            const categoriesItem = await LayoutModel.findOne({ type: "Categories" });
            await LayoutModel.findByIdAndUpdate(categoriesItem?._id, { type, categories }, { new: true });
        }

        res.status(200).json({
            success: true,
            message: "Layout Updated successfully",
        });
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// get layout by type
export const getLayoutBYType = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const layout = await LayoutModel.findOne({ type: req.body.type });
        if (!layout) return next(new ErrorHandler("Layout not found", 404));
        res.status(200).json({
            success: true,
            layout,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});