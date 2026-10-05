import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/product/user", label: "Products" },
  { to: "/order", label: "Orders" },
];

function MenuDesktop() {
  return (
    <div className="hidden md:flex items-center gap-6">
      {links.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `whitespace-nowrap text-lg font-medium transition-colors border-b-2 ${
              isActive
                ? "border-green-600 text-green-800"
                : "border-transparent text-green-700 hover:text-green-500"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}

export default MenuDesktop;
