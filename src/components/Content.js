import { useRef } from "react";
import  Registrar  from "./Registrar";
import { TravelerTable} from "./TravelerTable";

export const Content = () => {
  const registrarRef = useRef();
  function testing() {
    registrarRef.current.checkRegistrarValidity();
  }
  return (
    <div className="container">
      <Registrar />
      <TravelerTable />
      {/* <Traveler test={testing} /> */}
    </div>
  );
};
