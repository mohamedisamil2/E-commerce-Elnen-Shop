import { Link } from "react-router-dom";

function MenuDesktop() {
  return (
    <div className="hidden md:flex items-center gap-6">
      <Link to="/">
        <h3 className="text-2xl font-medium text-green-700 hover:text-green-500 transition-colors">
          Home
        </h3>
      </Link>
      <Link to="/product/user">
        <h3 className="text-2xl font-medium text-green-700 hover:text-green-500 transition-colors">
          Products
        </h3>
      </Link>
      <Link to="/order">
        <h3 className="text-2xl font-medium text-green-700 hover:text-green-500 transition-colors">
          Orders
        </h3>
      </Link>
    </div>
  );
}

export default MenuDesktop;
