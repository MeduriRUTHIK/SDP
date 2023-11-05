import { Document, Model } from "mongoose";

interface MothData {
    month: string;
    count: number;
};

export async function generateLast12MonthsData<T extends Document>(model: Model<T>): Promise<{ last12Months: MothData[] }> {
    const last12Months: MothData[] = [];
    const currentDate = new Date();
    
    //setting today to tomorrow
    currentDate.setDate(currentDate.getDate() + 1);
    
    for (let i = 11; i >= 0; i--) {
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i * 28);
        const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDay() - 28);
        const monthYear = endDate.toLocaleString('default', { day: "numeric", month: "short", year: "numeric" });
        const count = await model.countDocuments({
            createdAt: {
                $gte: startDate,
                $lt: endDate,
            }
        });
        last12Months.push({ month: monthYear, count });
    };
    return { last12Months }
};
