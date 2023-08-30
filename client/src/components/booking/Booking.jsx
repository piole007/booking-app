import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Booking = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestNumber, setGuestNumber] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");

  let lengthOfStay = 0;

  if (checkIn && checkOut) {
    lengthOfStay = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const response = await axios.post(
      "/bookings",
      {
        checkIn,
        checkOut,
        guestNumber,
        name,
        mobile,
        place: place._id,
        price: lengthOfStay * place.price,
      },
      { withCredentials: true }
    );
    const bookingId = response.data._id;
    setRedirect("/account/bookings/" + bookingId);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <p className="text-2xl text-center">
          Price: {place.price}€ / per night
        </p>
        <div className="border shadow rounded-2xl mt-4">
          <div className="flex">
            <div className="py-2 px-4 ">
              <label>Check in </label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="py-2 px-4 border-l">
              <label>Check out </label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div className="py-2 px-4 border-t">
            <label>Number of guests: </label>
            <input
              className="number"
              type="number"
              placeholder="1"
              value={guestNumber}
              onChange={(ev) => setGuestNumber(ev.target.value)}
            />
          </div>
          {lengthOfStay > 0 && (
            <div className="text-center pb-4 text-2xl">
              <p>
                Total price is:{" "}
                <span className="text-primary">
                  {lengthOfStay * place.price}€
                </span>
              </p>
            </div>
          )}
          {lengthOfStay > 0 && (
            <div className="py-2 px-4 border-t">
              <label>Your full name:</label>
              <input
                type="text"
                className="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                placeholder="Chris Harmmer"
              />
              <label>Your phone number:</label>
              <input
                type="tel"
                className="number"
                value={mobile}
                onChange={(ev) => setMobile(ev.target.value)}
                placeholder="+44..."
              />
            </div>
          )}
        </div>
        <button onClick={bookThisPlace} className="primary mt-2">
          Book this place
        </button>
      </div>
    </div>
  );
};

export default Booking;