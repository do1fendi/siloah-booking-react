import { useSelector } from "react-redux";
export const Header = () => {
  const { departureDate, availableSeat, tourSubject } = useSelector(
    (state) => state.form
  );

  return (
    <div className="w-100 p-2">
      <div className="alert alert-primary" role="alert">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12 col-xs-6">{departureDate}</div>
            <div className="col col-xs-12 col-sm-6 text-end">
              Available Seat:
              <span
                className={`badge rounded-circle mx-2 ${
                  availableSeat === 0
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
        </div>
        <div className="col mt-2">{tourSubject}</div>
      </div>
    </div>
  );
};
