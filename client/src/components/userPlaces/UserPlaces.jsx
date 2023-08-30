import React, { useEffect, useState } from "react";
import AccountNav from "../accountNav/AccountNav";
import { Link } from "react-router-dom";
import axios from "axios";

const UserPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/places", { withCredentials: true })
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

      <div className="mt-4 flex justify-center">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={'/account/places/'+place._id}
              key={place.id}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl w-max"
            >
              <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                {place.photos.length > 0 && (
                  <img className="object-cover" src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" />
                )}
              </div>
              <div className="grow-0 ">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
        {error && <div className="text-red-500">Error: {error.message}</div>}
      </div>
    </div>
  );
};

export default UserPlaces;
