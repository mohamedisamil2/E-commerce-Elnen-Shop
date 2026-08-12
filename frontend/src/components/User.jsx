import { Link } from "react-router-dom";
import { userStore } from "../stores/userStore";
import { User2Icon } from "lucide-react";

function User() {
  const { auth, logOut } = userStore();

  return (
    <div className="hidden md:flex dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        <User2Icon />
        {auth.name}
      </div>
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

export default User;
