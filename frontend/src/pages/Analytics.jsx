import { useEffect } from "react";
import { analyticStore } from "../stores/analyticStore";
import AnalyticsCard from "../components/AnalyticsCard";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

function Analytics() {
  const { showAnalytics, analytics, dailySales, isLoadingAnalytics } =
    analyticStore();

  useEffect(() => {
    showAnalytics();
  }, [showAnalytics]);

  if (isLoadingAnalytics) return <h1>loading...</h1>;

  console.log(dailySales);

  return (
    <div className="w-full flex flex-col space-y-6 px-4 sm:px-6 lg:px-8">
      <h1 className=" text-2xl font-semibold ">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Total Users"
          value={analytics?.users}
          icon={<Users size={150} />}
          color="from-emerald-500 to-teal-700"
        />
        <AnalyticsCard
          title="Total Products"
          value={analytics?.products}
          icon={<Package size={145} />}
          color="from-emerald-500 to-green-700"
        />
        <AnalyticsCard
          title="Total Sales"
          value={analytics?.totalSales}
          icon={<ShoppingCart size={130} />}
          color="from-emerald-500 to-cyan-700"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={analytics?.totalRevenue}
          icon={<DollarSign size={150} />}
          color="from-emerald-500 to-lime-700"
        />
      </div>
      <motion.div
        className="bg-gray-800/60 rounded-lg p-6 z-50 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySales}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" stroke="#D1D5DB" />

            <YAxis yAxisId="left" stroke="#D1D5DB" />

            <YAxis yAxisId="right" orientation="right" stroke="#D1D5DB" />

            <Tooltip />

            <Legend />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#10B981"
              strokeWidth={4}
              activeDot={{ r: 8 }}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={4}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

export default Analytics;
