import Registrar from "./Registrar";
import { Room } from "./Room";
import { useSelector } from "react-redux";
import { AddRoom } from "./AddRoom";
import { useRef } from "react";

import { Receipt } from "./Receipt";

export const Content = () => {
  const rooms = useSelector((state) => state.form.form.room);
  const form = useSelector((state) => state.form.form);
  const childRef = useRef();
  const checkRegistrarForm = () => {
    childRef.current.triggerHandleAddRoom();
  };
  return (
    <div className="container">
      <Registrar ref={childRef} />
      {rooms.map((room, index) => (
        <Room key={index} indexNo={index} checkRegistrarForm={checkRegistrarForm} />
      ))}
      <Receipt />
      <AddRoom />
      <p className="text-wrap text-break">{JSON.stringify(form)}</p>
    </div>
  );
};
