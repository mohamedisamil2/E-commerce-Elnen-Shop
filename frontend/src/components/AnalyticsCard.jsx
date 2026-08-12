import { motion } from "framer-motion";

function AnalyticsCard({ title, value, icon, color }) {
  return (
    <motion.div
      className={`bg-gray-800 rounded-lg p-6 shadow-lg mb-10 overflow-hidden relative ${color}`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <div className="z-10">
          <p className="text-white text-sm mb-1 font-semibold">{title}</p>
          <h3 className="text-white text-3xl font-bold">{value}</h3>
        </div>
      </div>
      <div className="absolute inset-0 bg-linear-to-br from-emerald-600 to-emerald-900 opacity-30" />
      <div className="absolute -bottom-4 -right-4 text-white opacity-50">
        {icon}
      </div>
    </motion.div>
  );
}

export default AnalyticsCard;
