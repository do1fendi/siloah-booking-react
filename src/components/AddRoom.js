import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoom } from "../store/form";
import { useState, useEffect } from "react";

export const AddRoom = () => {
  const [roomLeft, setRoomLeft] = useState(0);
  const trevelerPrevRoom = useSelector((state) => state.form.form.room);
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
    // check if previous room has traveler, if not set, cannot add room
    let ifPrevRoomHasTraveler = false;
    if (trevelerPrevRoom[trevelerPrevRoom.length - 1].traveler) {
      if (trevelerPrevRoom[trevelerPrevRoom.length - 1].traveler.length > 0)
        ifPrevRoomHasTraveler = true;
    }
    if (roomLeft === 0) {
      alert("No more available room");
    } else if (!ifPrevRoomHasTraveler) {
      alert("Please set traveler on previous room");
    } else {
      setRoomLeft(roomLeft - 1);
      dispatch(setRoom());
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-between mt-4 mb-4">
        <h3>
          Rooms <span className="fs-6">Left（{roomLeft}）</span>
        </h3>
        <button className="btn btn-primary px-5" onClick={handleAddRoom}>
          加房間
        </button>
      </div>
    </div>
  );
};
