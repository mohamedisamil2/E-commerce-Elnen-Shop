import {
  ChartNoAxesCombined,
  CirclePlus,
  Package,
  PanelRightClose,
  Settings,
  ShoppingBag,
  TicketPercent,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

function AdminDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="drawer lg:drawer-open bg-linear-to-r from-green-500 via-green-900 to-green-300"
    >
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle inline"
      />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-linear-to-r from-green-300 via-green-900 to-green-500">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost drawer-button"
          >
            {/* Sidebar toggle icon */}
            <PanelRightClose />
          </label>
          <div className="px-4 text-2xl font-medium text-slate-900">
            Admin Dashboard
          </div>
        </nav>
        {/* Page content here */}
        <div className="flex justify-center items-center mt-20">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-linear-to-t from-green-500 via-green-900 to-green-300 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow space-y-4">
            <Link to="/admin/analytics">
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Analytics"
                >
                  {/* Analytics icon */}
                  <ChartNoAxesCombined />
                  <span className="is-drawer-close:hidden">Analytics</span>
                </button>
              </li>
            </Link>
            <Link to="/admin/products/create">
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Create Products"
                >
                  {/* create product icon */}
                  <CirclePlus />
                  <span className="is-drawer-close:hidden">
                    Create Products
                  </span>
                </button>
              </li>
            </Link>
            <Link to="/admin/order">
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Orders"
                >
                  {/* order icon */}
                  <ShoppingBag />
                  <span className="is-drawer-close:hidden">Orders</span>
                </button>
              </li>
            </Link>
            <Link to="/admin/products/">
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Products"
                >
                  {/* product icon */}
                  <Package />
                  <span className="is-drawer-close:hidden">Products</span>
                </button>
              </li>
            </Link>

            <Link to="/admin/coupons">
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Coupons"
                >
                  {/* Home icon */}
                  <TicketPercent />
                  <span className="is-drawer-close:hidden">Coupons</span>
                </button>
              </li>
            </Link>

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <Settings />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default AdminDashboard;
