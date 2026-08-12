import asyncHandler from "express-async-handler";
import { getAnalyticsDaily, getDailySales } from "./reports/analyticService.js";

export const getAnalytics = asyncHandler(async (req, res) => {
  const analyticData = await getAnalyticsDaily();

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 6);

  const getdailySales = await getDailySales(startDate, endDate);

  res.json({
    message: "Get Analytics successfully",
    analyticData,
    getdailySales,
  });
});
