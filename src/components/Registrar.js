import { setRegistrar } from "../store/form";
import { useDispatch, useSelector } from "react-redux";
import { country } from "../store/country";
import { useEffect } from "react";
export const Registrar = () => {
  const storeRegistrar = useSelector((state) => state.form.registrar);
  const dispatch = useDispatch();
  const onChangeInput = (input, e) => {
    dispatch(setRegistrar({ input: input, value: e }));
    if (input === "country") {
      const tempCountry = country.filter((state) => state.country === e);
      const phoneCode = tempCountry[0].phoneCode;
      dispatch(setRegistrar({ input: "phoneCode", value: phoneCode }));
    }
  };
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
  useEffect(() => {}, []);
  return (
    <div>
      <form className="row g-3 needs-validation" noValidate>
        {/* <div className="">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="registrarName"
            placeholder="Name"
            required
            onChange={(e) => onChangeInput("name", e.target.value)}
          />
          <div class="valid-feedback">Looks good!</div>
          <label className="form-label">Age</label>
          <input
            type="Number"
            className="form-control form-control-sm"
            id="registrarAge"
            placeholder="Age"
            onChange={(e) => onChangeInput("age", e.target.value)}
          />
        </div> */}
        <div className="col-md-6">
          <label htmlFor="validationCustom01" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            onChange={(e) => onChangeInput("fn", e.target.value)}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            onChange={(e) => onChangeInput("ln", e.target.value)}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom02" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="validationCustom02"
            onChange={(e) => onChangeInput("email", e.target.value)}
            required
          />
          <div className="invalid-feedback">Email wrong.</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom04" className="form-label">
            Country
          </label>
          <select
            className="form-select"
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
        <div className="input-group mb-12">
          <span className="input-group-text" id="basic-addon1">
            {storeRegistrar.phoneCode}
          </span>
          <input
            type="number"
            className="form-control"
            placeholder="phoneNumber"
            aria-label="phoneNumber"
            aria-describedby="basic-addon1"
            onChange={(e) => onChangeInput("mobile", e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom02" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            onChange={(e) => onChangeInput("address", e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form>
      <p>{JSON.stringify(storeRegistrar)}</p>
    </div>
  );
};
