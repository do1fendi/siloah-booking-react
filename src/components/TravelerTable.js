import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export const TravelerTable = ({ indexNo }) => {
  const travelers = useSelector((state) => state.form.form.room[indexNo].traveler);
  return (
    <div className="mt-4 mb-5">
      {travelers && travelers.length > 0 ? (
        <div>
          <Table striped hover size="sm">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {travelers.map(({ firstName, lastName, mobile, status }, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>{lastName + " " + firstName}</td>
                    <td>{status}</td>
                    <td>{mobile}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
