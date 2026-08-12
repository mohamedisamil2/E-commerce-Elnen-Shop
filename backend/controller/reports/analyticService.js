import Orders from "../../model/orderModel.js";
import Products from "../../model/productModel.js";
import Users from "../../model/userModel.js";

export const getAnalyticsDaily = async () => {
  const totalUsers = await Users.countDocuments();
  const totalProducts = await Products.countDocuments();

  const salesData = await Orders.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);

  const { totalSales, totalRevenue } = salesData[0] || {
    totalSales: 0,
    totalRevenue: 0,
  };

  return {
    users: totalUsers,
    products: totalProducts,
    totalSales,
    totalRevenue,
  };
};

export const getDailySales = async (startDate, endDate) => {
  const dailySales = await Orders.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        sales: { $sum: 1 },
        revenue: { $sum: "$totalAmount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        sales: 1,
        revenue: 1,
      },
    },
  ]);

  // Create last 7 days
  const result = [];

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const dateString = date.toISOString().split("T")[0];

    const existingDay = dailySales.find((item) => item.date === dateString);

    result.push({
      date: dateString,
      sales: existingDay?.sales || 0,
      revenue: existingDay?.revenue || 0,
    });
  }

  return result;
  return dailySales;
};

//     $match: {
//       createdAt: {
//         $gte: startDate,
//         $lte: endDate,
//       },
//     },
//   },
//   {
//     $group: {
//       _id: {
//         $dateToString: {
//           format: "%Y-%m-%d",
//           date: "$createdAt",
//         },
//       },
//       sales: { $sum: 1 },
//       revenue: { $sum: "$totalAmount" },
//     },
//   },
//   { $sort: { _id: 1 }
