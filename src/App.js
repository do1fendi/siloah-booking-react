import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import "./App.css";
import { useEffect } from "react";
import { findRecord, getToken, setToken } from "./store/filemaker";

function App() {
  const { token } = useSelector((state) => state.filemaker);
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    const groupNumber = queryParams.get("groupNumber");
    (async () => {
      //Get Filemaker Session Token
      const res = await getToken();
      //Save token to store
      dispatch(setToken(res));
      const result = await findRecord(groupNumber, res);
      console.log(result);
    })();
  }, []);
  return (
    <div className="App">
      <header className="App-header"></header>
      <h1>{token}</h1>
      <Button>Hellow</Button>
    </div>
  );
}

export default App;
