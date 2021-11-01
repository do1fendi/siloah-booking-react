import Registrar from "./Registrar";
import { TravelerTable } from "./TravelerTable";
import { Room } from "./Room";
import { useSelector } from "react-redux";

export const Content = () => {
  const rooms = useSelector((state) => state.form.form.room);
  return (
    <div className="container">
      <Registrar />
      {rooms.map((room, index) => (
        <Room key={index} indexNo={index} />
      ))}
      
      {/* <TravelerTable /> */}
      {/* <Traveler test={testing} /> */}
    </div>
  );
};
