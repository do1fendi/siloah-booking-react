import { useState } from "react";
import { useSelector } from "react-redux";
import {ageCalculate} from "../store/ageCalculate";
export const Header = () => {
  const { groupNumber, departureDate, availableSeat, tourSubject } =
    useSelector((state) => state.form);
  const [variant, setVariant] = useState("bg-success");
  console.log(ageCalculate("11/15/2019",departureDate))
  return (
    <div className="p-3">
      <div className="alert alert-primary row" role="alert">
        <div className="col">{tourSubject}</div>
        <div className="col text-end">
          Available Seat:
          <span
            className={`badge rounded-pill px-2 mx-2 ${
              availableSeat == 0
                ? "bg-danger"
                : availableSeat < 6
                ? "bg-warning"
                : "bg-success"
            }`}
          >
            {availableSeat}
          </span>
        </div>
      </div>
      {/* <h1>{groupNumber}</h1>
      <h1>{departureDate}</h1>
      <h1>{availableSeat}</h1>
      <h1>{tourSubject}</h1> */}
      
    </div>
  );
};
