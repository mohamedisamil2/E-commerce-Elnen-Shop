import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="shrink-0">
      <Link
        to="/"
        className="inline-block whitespace-nowrap rounded-bl-full rounded-tr-full bg-linear-to-r from-green-600 to-green-800 px-5 py-2 text-xl font-semibold text-white"
      >
        El Nene Shop
      </Link>
    </div>
  );
}

export default Logo;
