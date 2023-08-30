import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../../placeImg/PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";

const UserBookings = () => {
  const [userBookings, setUserBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings", { withCredentials: true }).then((response) => {
      setUserBookings(response.data);
    });
  }, []);
  return (
    <div>
      {userBookings?.length > 0 ? (
        userBookings.map((booking) => (
          <div
            key={booking.id}
            className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-2"
          >
            <div className="w-48 flex justifu-center items-center">
              <PlaceImg place={booking.place} />
            </div>
            <div className="py-4 pr-3 grow">
              <h2 className="text-xl">{booking.place.title}</h2>
              <div className="border-t border-gray-300 mt-1 flex gap-2 items-center">
                <div className="flex gap-1 items-center">
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
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                  {format(new Date(booking.checkIn), "yyyy-MM-dd")}
                </div>
                &rarr;
                <div className="flex gap-1 items-center">
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
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                  {format(new Date(booking.checkOut), "yyyy-MM-dd")}
                </div>
              </div>
              <div className="text-gray-500">
                Number of nights:
                {differenceInCalendarDays(
                  new Date(booking.checkOut),
                  new Date(booking.checkIn)
                )}
              </div>
              <div className="text-xl">Total price: {booking.price}€</div>
            </div>
          </div>
        ))
      ) : (
        <div>No bookings found</div>
      )}
    </div>
  );
};

export default UserBookings;
