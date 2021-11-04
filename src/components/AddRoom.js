import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoom } from "../store/form";
import { useState, useEffect } from "react";

export const AddRoom = () => {
  const [roomLeft, setRoomLeft] = useState(0);
  const availableRoom = useSelector((state) => {
    const currPriceTable = state.form.priceTable;
    const x = currPriceTable.reduce(
      (prev, curr) => prev + curr.TOURPACKAGE_GROUPPRICE_roomAvailable,
      0
    );
    return x;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setRoomLeft(availableRoom - 1);
  }, [availableRoom]);
  const handleAddRoom = () => {
    if (roomLeft > 0) {
      setRoomLeft(roomLeft - 1);
      dispatch(setRoom());
    } else {
      alert("No more available room");
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-between mt-5">
        <h3>
          Rooms <span className="fs-6">Left（{roomLeft}）</span>
        </h3>
        <button className="btn btn-primary" onClick={handleAddRoom}>
          加房間
        </button>
      </div>
    </div>
  );
};
