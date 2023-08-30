import React from "react";

const Booking = ({ place }) => {
  return (
    <div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <p className="text-2xl text-center">
          Price: {place.price} € / per night
        </p>
        <div className="border shadow rounded-2xl mt-4">
          <div className="flex">
            <div className="py-2 px-4 ">
              <label>Check in </label>
              <input type="date" />
            </div>
            <div className="py-2 px-4 border-l">
              <label>Check out </label>
              <input type="date" />
            </div>
          </div>
          <div className="py-2 px-4 border-t">
            <label className="block">Number of guests: </label>
            <input className="number" type="number" value={1} />
          </div>
        </div>
        <button className="primary mt-2">Book this place</button>
      </div>
    </div>
  );
};

export default Booking;
