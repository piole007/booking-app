import { Navigate, redirect } from "react-router-dom";
import PlacesPage from "./PlacesPage";

export default function AccountPage() {
  // And the rest of code for users Account

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button
            onClick={logout}
            className="primary max-w-sm mx-auto"
          ></button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
