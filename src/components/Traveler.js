import { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { country } from "../store/country";
import { useDispatch, useSelector } from "react-redux";
import { setTraveler } from "../store/form";

export const Traveler = forwardRef(({ modal }, ref) => {
  const storeForm = useSelector((state) => state.form);
  const [travelerForm, setTravelerForm] = useState({
    ln: "",
    fn: "",
    email: "",
    country: "Taiwan",
    phoneCode: "+886",
  });
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    modal ? setShow(true) : setShow(false);
    if (storeForm.form.traveler.length >= storeForm.availableSeat) {
      alert("Limit seat exceeded");
      setShow(false);
    }
  };

  useImperativeHandle(ref, () => ({
    callFromParent() {
      handleShow();
      setValidated(false);
    },
  }));

  const handleTraveler = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      dispatch(setTraveler(travelerForm));
      handleClose();
      console.log(storeForm.form);
    }
    setValidated(true);
  };

  const onChangeInput = (input, e) => {
    switch (input) {
      case "country":
        const tempCountry = country.filter((state) => state.country === e);
        setTravelerForm({
          ...travelerForm,
          phoneCode: tempCountry[0].phoneCode,
        });
        break;
      case "ln":
        setTravelerForm({ ...travelerForm, ln: e });
        break;
      case "fn":
        setTravelerForm({ ...travelerForm, fn: e });
        break;
      case "email":
        setTravelerForm({ ...travelerForm, email: e });
        break;
      case "country":
        setTravelerForm({ ...travelerForm, country: e });
        break;
      case "mobile":
        setTravelerForm({ ...travelerForm, mobile: e });
        break;
      case "address":
        setTravelerForm({ ...travelerForm, address: e });
        break;

      default:
        break;
    }
  };

  return (
    <div className="traveler">
      {/* <div className="d-flex justify-content-between">
        <h2>Traveler</h2>
        <Button variant="primary" onClick={handleShow}>
          Add Traveler
        </Button>
      </div> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
          <Button variant="outline-info">Set as Registrar</Button>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form
              className="row g-3"
              noValidate
              validated={validated}
              onSubmit={handleTraveler}
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
                  defaultValue={travelerForm.country}
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
                    {travelerForm.phoneCode}
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
              <div className="d-flex gap-2 justify-content-end">
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Submit</Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
});
