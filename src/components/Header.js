import { useSelector } from "react-redux";
export const Header = () => {
  const { departureDate, availableSeat, tourSubject } = useSelector(
    (state) => state.form
  );

  return (
    <div className="w-100">
      <div className="alert alert-primary" role="alert">
        <div className="container">
          <div className="row">
            <div className="col-6 px-0">{departureDate}</div>
            <div className="col-6 px-0 text-end">
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
            </div>
          </div>
        </div>
        <div className="col mt-2">{tourSubject}</div>
      </div>
    </div>
  );
};
