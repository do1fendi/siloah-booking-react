import { useState, useRef } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateRoomTable, setRoom } from "../store/form";
import { Traveler } from "./Traveler";
export const Room = ({ indexNo }) => {
  const [inputRoom, setInputRoom] = useState("");
  const [roomMaxOccupancy, setRoomMaxOccupancy] = useState(0);
  const [inputStyle, setInputStyle] = useState({ borderColor: "" });
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const childRef = useRef();
  const roomTypeAvailable = useSelector((state) => {
    const rooms = state.form.roomOccupancyTable.filter(
      (room) => room.TOURPACKAGE_GROUPPRICE_roomAvailable > 0
    );
    const curRooms = [];
    rooms.forEach((room) => {
      curRooms.push(room.TOURPACKAGE_GROUPPRICE_roomTypeName);
    });
    return curRooms;
  });
  const roomOccupancy = useSelector((state) => state.form.roomOccupancyTable);

  const onChangeValue = (ev) => {
    setInputRoom(ev);
    // Update store available room
    if (ev && !inputRoom) {
      const index = roomOccupancy.findIndex(
        (item) => item.TOURPACKAGE_GROUPPRICE_roomTypeName == ev
      );
      dispatch(updateRoomTable({ indexPrevious: null, index: index }));
    } else if (ev && inputRoom) {
      const indexPrevious = roomOccupancy.findIndex(
        (item) => item.TOURPACKAGE_GROUPPRICE_roomTypeName === inputRoom
      );
      const index = roomOccupancy.findIndex(
        (item) => item.TOURPACKAGE_GROUPPRICE_roomTypeName == ev
      );
      dispatch(updateRoomTable({ indexPrevious: indexPrevious, index: index }));
    } else {
      const indexPrevious = roomOccupancy.findIndex(
        (item) => item.TOURPACKAGE_GROUPPRICE_roomTypeName === inputRoom
      );
      dispatch(updateRoomTable({ indexPrevious: indexPrevious, index: null }));
    }

    //set max current max room occupancy
    const currRoomType = roomOccupancy.filter(
      (room) => room.TOURPACKAGE_GROUPPRICE_roomTypeName == ev
    );    
    if (ev != "") {
      setRoomMaxOccupancy(
        currRoomType[0].TOURPACKAGE_GROUPPRICE_roomMaxOccupancy
      );
      // setRoom Store
      dispatch(setRoom({index:indexNo, roomType:Event}));
    } else {
      setRoomMaxOccupancy(0);
    }
  };

  const addTraveler = () => {
    if (inputRoom === "") {
      setInputStyle({ borderColor: "red" });
    }else if(roomMaxOccupancy==0){
      alert("Treveler limit reach")
    }
     else {
      setInputStyle({ borderColor: "green" });
      setIsOpen(true);
      childRef.current.callFromParent();
    }
  };

  const travelerSet = () => {
    setRoomMaxOccupancy(roomMaxOccupancy - 1);
  };

  return (
    <div className="p-2 mb-2 shadow-sm">
      Room index {indexNo}
      <Form>
        <InputGroup className="mb-2">
          <InputGroup.Text>Available Room</InputGroup.Text>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => onChangeValue(e.target.value)}
            style={inputStyle}
          >
            <option value="">- Select -</option>
            {roomTypeAvailable.map((room, index) => (
              <option key={index} value={room}>
                {room}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
      </Form>
      <div className="d-flex justify-content-between">
        <h3>Room: {inputRoom}</h3>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => addTraveler()}
        >
          Add Traveler{" "}
          <span className="badge bg-danger">{roomMaxOccupancy}</span>
        </button>
      </div>
      <Traveler ref={childRef} modal={isOpen} indexNo={indexNo} travelerSet={travelerSet} />
      {/* {JSON.stringify(roomOccupancy)} */}
    </div>
  );
};
