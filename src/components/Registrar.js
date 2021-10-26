import { setRegistrar } from "../store/form";
import { useDispatch, useSelector } from "react-redux";
import { country } from "../store/country";
import { forwardRef, useState, useRef } from "react";
import { Form } from "react-bootstrap";
import { Traveler } from "./Traveler";

function Registrar() {
  const storeForm = useSelector((state) => state.form.form);  
  const limit = useSelector((state)=>state.form.availableSeat)
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const childRef = useRef();

  const onChangeInput = (input, e) => {
    dispatch(setRegistrar({ input: input, value: e }));
    if (input === "country") {
      const tempCountry = country.filter((state) => state.country === e);
      const phoneCode = tempCountry[0].phoneCode;
      dispatch(setRegistrar({ input: "phoneCode", value: phoneCode }));
    }
  };

  const handleAddTraveler = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      setIsOpen(true);
      childRef.current.callFromParent();
    }
    setValidated(true);
  };

  return (
    <div className="registrar">
      <h3 className="text-center mb-4 mt-3">訂購人</h3>
      <Form
        className="row g-3 needs-validation"
        id="registrarId"
        noValidate
        validated={validated}
        onSubmit={handleAddTraveler}
      >
        <div className="col-md-6">
          <label htmlFor="validationCustom02" className="form-label">
            姓氏/ Last name
          </label>
          <input
            type="text"
            className="form-control shadow-sm"
            id="validationCustom02"
            onChange={(e) => onChangeInput("ln", e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom01" className="form-label">
            名字/ First name
          </label>
          <input
            type="text"
            className="form-control shadow-sm"
            id="validationCustom01"
            onChange={(e) => onChangeInput("fn", e.target.value)}
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="validationCustom02" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control shadow-sm"
            id="validationCustom02"
            onChange={(e) => onChangeInput("email", e.target.value)}
            required
          />
          <div className="invalid-feedback">Email wrong.</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom04" className="form-label">
            國家/ Country
          </label>
          <select
            className="form-select shadow-sm"
            id="validationCustom04"
            defaultValue="Taiwan"
            onChange={(e) => onChangeInput("country", e.target.value)}
            required
          >
            {country.map((e, key) => {
              return (
                <option key={key} value={e.country}>
                  {e.country}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom04" className="form-label">
            聯絡電話/ Contact Number
          </label>
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              {storeForm.registrar.phoneCode}
            </span>
            <input
              type="number"
              className="form-control shadow-sm"
              aria-label="phoneNumber"
              aria-describedby="basic-addon1"
              onChange={(e) => onChangeInput("mobile", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-md-12">
          <label htmlFor="validationCustom02" className="form-label">
            地址/ Address
          </label>
          <input
            type="text"
            className="form-control shadow-sm"
            id="validationCustom02"
            onChange={(e) => onChangeInput("address", e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-between mt-5">
          <h3>
            Travelers <span className="fs-6">limit（{limit}）</span>
          </h3>
          <button className="btn btn-primary" type="submit">
            Add Traveler
          </button>
        </div>
        <Traveler ref={childRef} modal={isOpen} />
      </Form>
      {/* <p>{JSON.stringify(storeForm)}</p> */}
    </div>
  );
}

export default forwardRef(Registrar);
