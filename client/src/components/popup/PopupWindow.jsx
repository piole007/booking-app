import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const PopupWindow = ({ text, popupInfo }) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return (
    <div>
      <button type="submit"
        className="bg-primary p-2 m-2 w-full text-white rounded-2xl"
        onClick={() => setOpen((o) => !o)}
      >
        {text}
      </button>
      <Popup
        className="flex "
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
      >
        <div className="modal py-10 text-center">
          <div className="py-4">{popupInfo}</div>
          <button
            className="bg-primary text-white rounded-2xl p-2"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default PopupWindow;
