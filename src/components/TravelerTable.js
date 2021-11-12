import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export const TravelerTable = ({ indexNo }) => {
  const travelers = useSelector((state) => state.form.form.room[indexNo].traveler);
  return (
    <div className="mt-4 mb-5 px-4">
      {travelers && travelers.length > 0 ? (
        <div>
          <Table size="sm">
            <thead className="thead-light">
              <tr>
                <th className="text-center">#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {travelers.map(({ firstName, lastName, price, status }, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>{lastName + " " + firstName}</td>
                    <td>{status}</td>
                    <td>{price}</td>
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
