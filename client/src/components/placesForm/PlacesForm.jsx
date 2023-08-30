import { useEffect, useState } from "react";
import PhotosUploader from "../photosUploader/PhotosUploader";
import Perks from "../perks/Perks";
import axios from "axios";
import "./PlacesForm.css";
import { Navigate, useParams } from "react-router-dom";

const PlacesForm = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(50);
  const [addedPhotos, setAddedPhotos] = useState([1]);
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  const inputHeader = (text) => <h2>{text}</h2>;

  const inputDescription = (text) => (
    <p className="text-gray-500 text-sm">{text}</p>
  );

  const preInput = (header, description, isRequired = false) => (
    <div>
      {inputHeader(header)}
      {inputDescription(description)}
      {isRequired && <span className="required-asterisk">* required</span>}
    </div>
  );

  const validateForm = () => {
    if (!title || !address || !description || !maxGuests || !price) {
      alert("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const savePlace = async (ev) => {
    try {
      ev.preventDefault();
      if (!validateForm()) {
        return;
      }
      const placeData = {
        title,
        address,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        addedPhotos,
        price,
      };
      if (id) {
        await axios.put(
          "/places",
          {
            id,
            ...placeData,
          },
          { withCredentials: true }
        );
        setRedirect(true);
      } else {
        await axios.post("/places", placeData, { withCredentials: true });
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error saving place:", error);
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "title for your place. Should be short and descriptive.",
          true
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My cozy apartment"
          className="title"
        />
        {preInput("Address", "address of the accommodations", true)}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
          className="address"
        />
        {preInput("Photos", "the more photos the better")}

        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "description of the place", true)}
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
        <div className="grid gap-2 grid-cols-2 md:grid-4">
          <div>
            <h3 className="mt-2 -mb-1">Check-in time</h3>
            <p className="required-asterisk">* required</p>
            <input
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="15"
              type="number"
              className="checkin"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check-out time</h3>
            <p className="required-asterisk">* required</p>
            <input
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="12"
              type="number"
              className="checkout"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number guests</h3>
            <p className="required-asterisk">* required</p>
            <input
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              type="number"
              className="guest"
              required
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <p className="required-asterisk">* required</p>
            <input
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              type="number"
              className="price"
              required
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
