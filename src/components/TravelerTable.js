import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export const TravelerTable = () => {
  const travelers = useSelector((state) => state.form.form.traveler);
  return (
    <div className="traveler">
        <h3>{travelers.length}</h3>
      {travelers.map(({ fn }) => (
        <p key={fn}>{fn}</p>
      ))}
      <h2>Travelers</h2>
      {/* {travelers.length > 0 ? ( */}
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {travelers.map(({ fn, ln, mobile }, index) => {
              <tr>
                <td>dfgdfg</td>
                <td>dfgfg</td>
              </tr>;
            })}
            {/* <tr>
                <td>sds</td>
                <td>sdsd</td>
            </tr> */}
          </tbody>
        </Table>
      {/* ) : (
        ""
      )} */}
    </div>
  );
};
