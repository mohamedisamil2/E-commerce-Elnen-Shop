import { Link } from "react-router-dom";
import Logo from "./Logo";
import { userStore } from "../stores/userStore";
import { LogIn, LogOut } from "lucide-react";
import User from "./User";
import Admin from "./Admin";
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import SearchField from "./SearchField";
import CartLogo from "./CartLogo";
// import { cartStore } from "../stores/cartStore";

function Navbar() {
  const { auth } = userStore();
  // const { isCartOpen } = cartStore();
  // console.log(isCartOpen);
  const isAdmin = auth?.role === "admin";
  return (
    <header
      className={`fixed top-0 z-50 min-w-full bg-white shadow-sm ${auth?.role === "admin" ? "m-0" : "mb-12"} `}
    >
      <nav className="container mx-auto flex items-center justify-between gap-8 h-16 ">
        {/* Logo */}
        <Logo />

        {/* Search */}
        {auth?.role !== "admin" && <SearchField />}

        {/* desktop Menu */}
        {auth?.role !== "admin" && <MenuDesktop />}

        {/* Cart */}
        {auth?.role !== "admin" && <CartLogo />}

        {/* Mobile Menu */}
        <MenuMobile />

        {!auth ? (
          <div className="hidden md:flex items-center gap-4 ">
            <Link
              to="/login"
              className="flex items-center text-xl font-medium text-green-700 hover:text-green-500 transition-colors gap-2"
            >
              <h3 className="">Sign In</h3>
              <LogIn className="" />
            </Link>
            <Link
              to="/register"
              className="flex items-center text-xl font-medium text-green-700 hover:text-green-500 transition-colors gap-2 "
            >
              <h3 className="">Sing Up</h3>
              <LogOut />
            </Link>
          </div>
        ) : (
          <>{isAdmin ? <Admin /> : <User />}</>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
