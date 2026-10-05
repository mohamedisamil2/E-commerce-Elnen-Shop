import { Link } from "react-router-dom";
import Logo from "./Logo";
import { userStore } from "../stores/userStore";
import { LogIn,  UserPlus } from "lucide-react";
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
    <header className="fixed top-0 z-50 min-w-full bg-white/80 backdrop-blur shadow-sm">
      <nav className="container mx-auto flex items-center justify-between gap-8 h-16 px-4">
        {/* Logo */}
        <Logo />

        {/* Search */}
        {!isAdmin && <SearchField />}

        {/* desktop Menu */}
        {!isAdmin && <MenuDesktop />}

        {/* Cart */}
        {!isAdmin && <CartLogo />}

        {/* Mobile Menu */}
        <MenuMobile />

        {!auth ? (
          <div className="hidden md:flex shrink-0 items-center gap-4">
            <Link
              to="/login"
              className="flex items-center gap-2 whitespace-nowrap text-base font-medium text-green-700 hover:text-green-500 transition-colors"
            >
              <span>Sign In</span>
              <LogIn size={18} />
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-green-600 px-4 py-2 text-base font-medium text-white hover:bg-green-700 transition-colors"
            >
              <span>Sign Up</span>
              <UserPlus size={18} />
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
