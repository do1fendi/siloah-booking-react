import { useDispatch, useSelector } from "react-redux";
// import Button from "react-bootstrap/Button";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import "./App.css";
import { useEffect } from "react";
import { findRecord, getToken, setToken } from "./store/filemaker";
import { setForm } from "./store/form";
import { Header } from "./components/Header";

function App() {
  // const { token } = useSelector((state) => state.filemaker);
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    (async () => {
      //Get Filemaker Session Token
      const res = await getToken();
      //Save token to store
      dispatch(setToken(res));
      const result = await findRecord(queryParams.get("groupNumber"), res);
      dispatch(setForm(result.data[0].fieldData));
      console.log(result.data[0].fieldData);
    })();
  }, []);
  return (
    <div className="App">
      <Header />
      {/* <h1>{token}</h1>
      <Button>Hellow</Button> */}
    </div>
  );
}

export default App;
