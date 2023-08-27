import { useContext, useState } from "react";
import { UserContext } from "../userContext/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import "./Account.css";
import axios from "axios";

const Account = () => {
  const { user, ready, setUser} = useContext(UserContext);
  let { subpage } = useParams();
  const [redirect, setRedirect] = useState(null);

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading...";
  }

  
  function linkClasses(type = null) {
    let classes = "py-2 px-6 ";
    if (type === subpage) {
      classes += "bg-primary text-white rounded-full";
    }
    return classes;
  }

  async function logout() {
    await axios.get("/logout", { withCredentials: true });
    setRedirect("/");
    setUser(null);
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-4 gap-2 mb-8">
        <Link className={linkClasses("profile")} to={"/account"}>
          My profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My accommodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          <p>
            Logged in as {user.name} ({user.email})
          </p>
          <button onClick={logout} className="logout">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
