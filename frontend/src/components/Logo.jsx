import { Link } from "react-router-dom";

function Logo() {
  return (
    <div>
      <Link
        to="/"
        className="text-xl md:text-2xl font-semibold bg-linear-to-r from-green-500 via-green-900 to-green-300 rounded-bl-full rounded-tr-full px-4 py-2"
      >
        El Nene Shop
      </Link>
    </div>
  );
}

export default Logo
