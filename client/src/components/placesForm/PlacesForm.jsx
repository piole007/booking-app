import React, { useState } from "react";
import Perks from "../perks/Perks";
import axios from "axios";

const PlacesForm = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  const inputHeader = (text) => <h2 className="text-2xl mt-4">{text}</h2>;
  const inputDescription = (text) => (
    <p className="text-gray-500 text-sm">{text}</p>
  );

  const preInput = (header, description) => (
    <div>
      {inputHeader(header)}
      {inputDescription(description)}
    </div>
  );

  const addPhotoByLink = async (ev) => {
    ev.preventDefault();
    await axios.post(
      "/upload-by-link",
      { link: photoLink },
      { withCredentials: true }
    );
  };

  return (
    <form>
      {preInput(
        "Title",
        "title for you place. Should be short and descriptive."
      )}
      <input
        type="text"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        placeholder="title, for example: My cozy apt"
      />
      {preInput("Address", "address of the accommodations")}

      <input
        type="text"
        value={address}
        onChange={(ev) => setAddress(ev.target.value)}
        placeholder="address"
      />
      {preInput("Photos", "the more photos the better")}

      <div className="flex gap-2">
        <input
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          type="text"
          placeholder={"Add using a link"}
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-200 px-4 rounded-2xl"
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <button className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </button>
      </div>
      {preInput("Description", "description of the place")}

      <textarea
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      {preInput("Perks", " Select all the perks of your place")}

      <div>
        <Perks selected={perks} onChange={setPerks} />
      </div>
      {preInput("Extra info", "house rules etc.")}

      <textarea
        value={extraInfo}
        onChange={(ev) => setExtraInfo(ev.target.value)}
      />

      {preInput(
        "Check-in & Check-out times",
        "add check-in and check-out times, remember to have some time window for cleaning between guests."
      )}

      <div className="grid gap-2 sm:grid-cols-3">
        <div>
          <h3 className="mt-2 -mb-1">Check-in time</h3>
          <input
            value={checkIn}
            onChange={(ev) => setCheckIn(ev.target.value)}
            placeholder="15:00"
          />
        </div>
        <div>
          <h3 className="mt-2 -mb-1">Check-out time</h3>
          <input
            value={checkOut}
            onChange={(ev) => setCheckOut(ev.target.value)}
            placeholder="12:00"
          />
        </div>
        <div>
          <h3 className="mt-2 -mb-1">Max number guests</h3>
          <input
            value={maxGuests}
            onChange={(ev) => setMaxGuests(ev.target.value)}
            type="number"
          />
        </div>
      </div>
      <div>
        <button className="primary my-4">Save</button>
      </div>
    </form>
  );
};

export default PlacesForm;
