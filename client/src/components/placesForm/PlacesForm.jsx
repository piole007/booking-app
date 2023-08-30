import React, { Navigate, useState } from "react";
import PhotosUploader from "../photosUploader/PhotosUploader";
import Perks from "../perks/Perks";
import axios from "axios";
import "./PlacesForm.css";

const PlacesForm = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [addedPhotos, setAddedPhotos] = useState([1]);
  const [redirect, setRedirect] = useState(false);

  const inputHeader = (text) => <h2>{text}</h2>;

  const inputDescription = (text) => (
    <p className="text-gray-500 text-sm">{text}</p>
  );

  const preInput = (header, description) => (
    <div>
      {inputHeader(header)}
      {inputDescription(description)}
    </div>
  );

  const addNewPlace = async (ev) => {
    ev.preventDefault();
    await axios.post(
      "/places",
      {
        title,
        address,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        addedPhotos,
      },
      { withCredentials: true }
    );
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <form onSubmit={addNewPlace}>
        {preInput(
          "Title",
          "title for your place. Should be short and descriptive."
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My cozy apartment"
          className="title"
        />
        {preInput("Address", "address of the accommodations")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
          className="address"
        />
        {preInput("Photos", "the more photos the better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

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
              placeholder="15"
              type="number"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check-out time</h3>
            <input
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="12"
              type="number"
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
    </div>
  );
};

export default PlacesForm;
