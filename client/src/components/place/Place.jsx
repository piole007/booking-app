import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Booking from "../booking/Booking";

const Place = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [allPhotos, setAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  if (allPhotos) {
    return (
      <div className="absolute inset-0 bg-white">
        <div className="pt-6 px-20 grid gap-4 flex justify-center items-center">
          <div>
            <h2 className="text-3xl">Photos of {place.title}</h2>
            <button
              onClick={() => setAllPhotos(false)}
              className="fixed top-4 left-4 p-4 rounded-full bg-white hover:bg-gray-100 shadow shadow-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img
                  className=""
                  src={"http://localhost:4000/uploads/" + photo}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 pt-8 px-8 ">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="flex gap-1 my-3 block font-semibold underline"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
        rel="noreferrer"
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        {place.address}
      </a>
      <div className="relative max-w-7xl">
        <div className="grid gap-2 grid-cols-[2fr_1fr] ">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  onClick={() => setAllPhotos(true)}
                  className="aspect-square object-cover py-2 cursor-pointer"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                onClick={() => setAllPhotos(true)}
                className="aspect-square object-cover p-2 cursor-pointer"
                src={"http://localhost:4000/uploads/" + place.photos[1]}
                alt=""
              />
            )}
            {place.photos?.[2] && (
              <img
                onClick={() => setAllPhotos(true)}
                className="aspect-square object-cover p-2 cursor-pointer"
                src={"http://localhost:4000/uploads/" + place.photos[2]}
                alt=""
              />
            )}
          </div>
        </div>
        <button
          onClick={() => setAllPhotos(true)}
          className="flex gap-2 absolute bottom-4 right-4 p-4 bg-white rounded-2xl border shadow-md shadow-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM15.375 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
              clipRule="evenodd"
            />
          </svg>
          More photos
        </button>
      </div>

      <div className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            <p className="mt-4">{place.description}</p>
          </div>
          <p>
            <span className="font-bold">Check-in:</span> {place.checkIn} h
          </p>
          <p>
            <span className="font-bold">Check-out:</span> {place.checkOut} h
          </p>
          <p>
            <span className="font-bold">Max guests:</span> {place.maxGuests}
          </p>
        </div>
        <div>
          <Booking place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 mt-2 py-6 border-t mb-6 ">
        <h2 className="mt-4 font-semibold text-2xl ">Extra info</h2>
        <p className="mt-4 text-xm text-gray-500 leading-4">
          {place.extraInfo}
        </p>
      </div>
    </div>
  );
};

export default Place;
