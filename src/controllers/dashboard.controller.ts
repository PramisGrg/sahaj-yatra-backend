import { Request, Response, NextFunction } from "express";
import { Bus, BusOwner } from "../models/bus.modal";
import User from "../models/user.model";
import saleMapper from "../helpers/salemapper";
import Transaction from "../models/transaction.model";
import throwError from "../utils/throw.error";

export const getBusownerDashboardController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const busOwnerId = res.locals.user.id;
    const busOwner = await BusOwner.findById(busOwnerId);
    if (!busOwner) return throwError(req, res, "Invalid Bus Owner", 404);

    const buses = await Bus.find({ busOwner: busOwnerId }).lean();
    let totalSaleData: { date: Date; amount: number }[] = [];

    buses.forEach((bus) => {
      if (bus.sale) {
        bus.sale.forEach((s) => {
          totalSaleData.push({
            amount: s.amount,
            date: s.date,
          });
        });
      }
    });

    const overAllSalesData = saleMapper(totalSaleData);

    const busMap = buses.map((bus) => {
      return {
        busNumber: bus.busNumber,
        busSale: bus.sale,
      };
    });

    const newMap: any = [];
    let graphData: { busName: string; sale: object }[] = [];

    busMap.forEach((bus) => {
      if (bus.busSale) {
        const sales = saleMapper(bus.busSale);
        graphData.push({
          busName: bus.busNumber,
          sale: sales,
        });
      }
    });
    const dashboardData = {
      totalDailySale: Math.round(overAllSalesData.daily),
      totalYearlySale: Math.round(overAllSalesData.monthly),
      totalMonthlySale: Math.round(overAllSalesData.yearly),
      graphData,
    };

    return res.status(200).json({
      message: "Bus Owner dashboard",
      data: dashboardData,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getUserDashboardController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = res.locals.user.id;
    const transactions = await Transaction.find({
      userId: userId,
    });
    const creditData = transactions.filter(
      (transaction) => transaction.transactionType === "credit"
    );
    const debitData = transactions.filter(
      (transaction) => transaction.transactionType === "debit"
    );

    let creditAmount = 0;
    let debitAmount = 0;

    creditData.forEach((c) => {
      creditAmount += c.amount;
    });

    debitData.forEach((d) => {
      debitAmount += d.amount;
    });

    return res.status(200).json({
      message: "User dashboard",
      data: {
        creditAmount,
        debitAmount,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getSuperAdminDashboardController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userCount = await User.countDocuments();
    const busCount = await Bus.countDocuments();
    const adminCount = await BusOwner.countDocuments();

    return res.status(200).json({
      message: "Admin dashboard data successfully fetched",
      data: {
        userCount,
        busCount,
        adminCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getUserDashboardController,
};
