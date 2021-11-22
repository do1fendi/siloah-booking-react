import { useSelector } from "react-redux";
import logo from '../images/logo.png';
export const Header = () => {
  const { departureDate, availableSeat, tourSubject } = useSelector(
    (state) => state.form
  );
  console.log(window.location.origin);
  return (
    <div className="w-100">
      <div className="alert alert-primary" role="alert">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center text-md-start">
              <img className="logo" src={logo} alt="Logo" />
            </div>
            <div className="col-12 px-0 fs-6 fw-bold text-center">出發日： {departureDate}</div>
            {/* <div className="col-6 px-0 text-end">
              Available Seat:
              <span
                className={`badge rounded-circle ${
                  availableSeat === 0
                    ? "bg-danger"
                    : availableSeat < 6
                    ? "bg-warning"
                    : "bg-success"
                }`}
              >
                {availableSeat}
              </span>
            </div> */}
        <div className="text-center fw-bold fs-6 col-12 sm:mt-3">{tourSubject}</div>
          </div>
        </div>
      </div>
    </div>
  );
};