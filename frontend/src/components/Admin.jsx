import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { userStore } from "../stores/userStore";

function Admin() {
  const { auth, logOut } = userStore();

  return (
    <div className="hidden md:flex dropdown dropdown-end">
      <Link to="/admin">
        <div tabIndex={0} role="button" className="btn btn-ghost">
          <Lock />
          {auth.name}
        </div>
      </Link>
      <ul
        tabIndex="-1"
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm mt-8"
      >
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <button onClick={logOut}>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default Admin;
