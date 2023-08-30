import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/accountNav/AccountNav";
import axios from "axios";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/places")
      .then(({ data }) => {
        console.log(data); // Check the value of data
        setPlaces(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <div>
      <AccountNav />

      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>

      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <div key={place.id} className="bg-gray-200 p-4 rounded 2xl">
              {place.title}
            </div>
          ))}
        {error && <div className="text-red-500">Error: {error.message}</div>}
      </div>
    </div>
  );
};

export default PlacesPage;
