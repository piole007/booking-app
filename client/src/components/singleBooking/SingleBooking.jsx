import { useParams } from "react-router-dom";

const SingleBooking = () => {
  const { id } = useParams();
  return <div>singleBooking: {id}</div>;
};

export default SingleBooking;
