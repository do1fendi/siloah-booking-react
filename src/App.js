import { useDispatch, useSelector } from "react-redux";
// import Button from "react-bootstrap/Button";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import "./App.css";
import { useEffect, useState } from "react";
import { findRecord, getToken, setToken } from "./store/filemaker";
import { setForm, setPriceTable } from "./store/form";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Agreement } from "./components/Agreement";

function App() {
  // const { token } = useSelector((state) => state.filemaker);
  const [loading, setloading] = useState(false);
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    (async () => {
      //Set loading true
      setloading(true);
      //Get Filemaker Session Token
      const res = await getToken();
      //Save token to store
      dispatch(setToken(res));
      const result = await findRecord(queryParams.get("groupNumber"), res);
      // store fieldata from filemaker
      dispatch(
        setForm(
          JSON.parse(
            JSON.stringify(result.data[0].fieldData).replaceAll(
              /(::)|[(]|[)]/g,
              "_"
            )
          )
        )
      );
      // store portaldata from filemaker
      dispatch(
        setPriceTable(
          JSON.parse(
            JSON.stringify(result.data[0].portalData).replaceAll(
              /(::)|[(]|[)]/g,
              "_"
            )
          )
        )
      );
      setloading(false);
      // console.log(form)
      // console.log(JSON.stringify(result.data[0].fieldData).replaceAll(/(::)|[(]|[)]/g,"_"));
    })();
  }, []);
  return (
    <div className="App">
      {loading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        ""
      )}
      <Header />
      <Content />
      <Agreement />
      {/* <p>{JSON.stringify(form.priceTable)}</p> */}
    </div>
  );
}

export default App;
