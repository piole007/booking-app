import { useContext, useState } from "react";
import { UserContext } from "../userContext/UserContext";
import { Navigate, useParams } from "react-router-dom";
import PlacesPage from "../../pages/PlacesPage";
import "./Profile.css";
import axios from "axios";
import AccountNav from "../accountNav/AccountNav";

const Profile = () => {
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  const [redirect, setRedirect] = useState(null);

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading...";
  }

  async function logout() {
    await axios.post("/logout", { withCredentials: true });
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
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="logout">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default Profile;
