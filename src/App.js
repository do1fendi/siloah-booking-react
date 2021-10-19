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
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(window.location.search);
 
  useEffect(() => {    
    (async () => {
      //Get Filemaker Session Token
      const res = await getToken();
      //Save token to store
      dispatch(setToken(res));
      const result = await findRecord(queryParams.get("groupNumber"), res);
      dispatch(setForm(JSON.parse(JSON.stringify(result.data[0].fieldData).replaceAll(/(::)|[(]|[)]/g,"_"))));
      // console.log(JSON.stringify(result.data[0].fieldData))
      // console.log(JSON.stringify(result.data[0].fieldData).replaceAll(/(::)|[(]|[)]/g,"_"));
    })();
  }, []);
  return (
    <div className="App">
      <Header />
      {/* <h1>{token}</h1>
      <Button>Hellow</Button> */}
      <p>{JSON.stringify(form)}</p>
    </div>
  );
}

export default App;
