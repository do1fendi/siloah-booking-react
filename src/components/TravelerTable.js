import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export const TravelerTable = () => {
  const travelers = useSelector((state) => state.form.form.traveler);
  return (
    <div className="traveler mb-5">
      {travelers.length > 0 ? (
        <div>          
          <Table striped hover size="sm">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>Name</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {travelers.map(({ fn, ln, mobile }, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">{index+1}</td>
                    <td>{ln + " " + fn}</td>
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
