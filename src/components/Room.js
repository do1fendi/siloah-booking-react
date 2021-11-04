import { useState, useRef } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateRoomTable, updateRoomForm, clearTraveler } from "../store/form";
import { Traveler } from "./Traveler";
import { TravelerTable } from "./TravelerTable";

export const Room = ({ indexNo, triggerHandleAddRoom }) => {
  const [inputRoom, setInputRoom] = useState("");
  const [roomMaxOccupancy, setRoomMaxOccupancy] = useState(0);
  const [inputStyle, setInputStyle] = useState({ borderColor: "" });
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const childRef = useRef();
  const [selectedOption, setSelectedOption] = useState("");
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
      dispatch(updateRoomForm({ index: indexNo, roomType: ev }));
    } else {
      setRoomMaxOccupancy(0);
    }

    //Clear Traveler list room changed
    dispatch(clearTraveler({ index: indexNo }));
    setSelectedOption("")    
  };

  const addTraveler = () => {
    console.log(triggerHandleAddRoom())
    if (inputRoom === "") {
      setInputStyle({ borderColor: "red" });
    } else if (roomMaxOccupancy == 0) {
      alert("Treveler limit reach");
    } else {
      setInputStyle({ borderColor: "green" });
      setIsOpen(true);
      childRef.current.callFromParent();
    }
  };

  const travelerSet = () => {
    setRoomMaxOccupancy(roomMaxOccupancy - 1);
  };

  return (
    <div className="p-3 mb-2 shadow-sm mt-3 mb-3">
      Room index {indexNo}
      <Form>
        <InputGroup className="mb-2">
          <InputGroup.Text>可用客房</InputGroup.Text>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => onChangeValue(e.target.value)}
            style={inputStyle}
            value={selectedOption}    
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
      <TravelerTable indexNo={indexNo} />
      <div className="d-flex justify-content-between">
        <h5 className="text-green fw-bold">選定房間: {inputRoom}</h5>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => addTraveler()}
        >
          加旅客 <span className="badge bg-danger">{roomMaxOccupancy}</span>
        </button>
      </div>
      <Traveler
        ref={childRef}
        modal={isOpen}
        indexNo={indexNo}
        travelerSet={travelerSet}
      />
    </div>
  );
};
