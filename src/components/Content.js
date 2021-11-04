import Registrar from "./Registrar";
// import { Room } from "./Room";
import { useSelector } from "react-redux";
import { AddRoom } from "./AddRoom";

export const Content = () => {
  // const rooms = useSelector((state) => state.form.form.room);
  const form = useSelector((state) => state.form.form);
  return (
    <div className="container">
      <Registrar />
      {/* {rooms.map((room, index) => (
        <Room key={index} indexNo={index} />
      ))}       */}
      <AddRoom />
      <p className="text-wrap text-break">{JSON.stringify(form)}</p>
    </div>
  );
};
