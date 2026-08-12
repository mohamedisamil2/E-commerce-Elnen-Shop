import { Menu } from "lucide-react";
import { userStore } from "../stores/userStore";
import { Link } from "react-router-dom";
import Admin from "./Admin";
import User from "./User";

function MenuMobile() {
  const { auth } = userStore();
  const isAdmin = auth?.role === "admin";

  return (
    <div className="dropdown dropdown-end md:hidden lg:hidden xl:hidden">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        <Menu />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-50 w-56 p-2 shadow-lg"
      >
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/product">Products</Link>
        </li>

        <li>
          <Link to="/cart">Cart</Link>
        </li>
        {!auth ? (
          <>
            <li>
              <Link to="/login">Sign In</Link>
            </li>

            <li>
              <Link to="/register">Sign Up</Link>
            </li>
          </>
        ) : (
          <>{isAdmin ? <Admin /> : <User />}</>
        )}
      </ul>
    </div>
  );
}

export default MenuMobile;
