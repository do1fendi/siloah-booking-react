import { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { country } from "../store/country";
import { useDispatch, useSelector } from "react-redux";
import { setTraveler } from "../store/form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Traveler = forwardRef(({ modal, travelerSet, indexNo }, ref) => {
  const storeForm = useSelector((state) => state.form);
  const travelerNumber = useSelector(
    (state) => state.form.form.traveler.length
  );
  const [startDate, setStartDate] = useState(undefined);
  const [travelerForm, setTravelerForm] = useState({
    ln: "",
    fn: "",
    gender: "male",
    email: "",
    country: "Taiwan",
    phoneCode: "+886",
    dob: "",
    address: "",
  });
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const range = (start, end, length = end - start + 1) =>
    Array.from({ length }, (_, i) => start + i);
  const years = range(1921, new Date().getFullYear() + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
      travelerSet();
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
      case "gender":
        setTravelerForm({ ...travelerForm, gender: e });
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
      case "dob":
        setStartDate(e);
        const month = (e.getMonth() + 1).toString().padStart(2, "0");
        const year = e.getFullYear();
        const day = e.getDate();
        const combined = `${month}/${day}/${year}`;
        setTravelerForm({ ...travelerForm, dob: combined });
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
          <Modal.Title>旅客 Room Index {indexNo}</Modal.Title>
          {travelerNumber < 1 ? (
            <Button variant="outline-info">與訂購人相同</Button>
          ) : (
            ""
          )}
        </Modal.Header>
        <Modal.Body>
          <>
            <Form
              className="row g-3"
              noValidate
              validated={validated}
              onSubmit={handleTraveler}
            >
              <div className="col-md-4">
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
              <div className="col-md-4">
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
              <div className="col-md-4">
                <label htmlFor="validationCustom01" className="form-label">
                  生別/ Gender
                </label>
                <select
                  className="form-select shadow-sm"
                  id="validationCustom04"
                  defaultValue="male"
                  onChange={(e) => onChangeInput("gender", e.target.value)}
                  required
                >
                  <option value="male">男</option>
                  <option value="female">女</option>
                </select>
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
              <div className="col-md-6">
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
              </div>
              <div className="col-md-6">
                <label htmlFor="validationCustom02" className="form-label">
                  Date of Birth
                </label>
                <DatePicker
                  className="form-control shadow-sm"
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div
                      style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {/* <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        {"<"}
                      </button> */}
                      <select
                        value={date.getFullYear()}
                        onChange={({ target: { value } }) => changeYear(value)}
                        className="rounded"
                      >
                        {years.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <select
                        value={months[date.getMonth()]}
                        onChange={({ target: { value } }) =>
                          changeMonth(months.indexOf(value))
                        }
                        className="rounded ms-2"
                      >
                        {months.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      {/* <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        {">"}
                      </button> */}
                    </div>
                  )}
                  dateFormat="MM/dd/yyyy"
                  selected={startDate}
                  required
                  onChange={(e) => onChangeInput("dob", e)}
                />
                {/* <DatePicker
                  className="form-control shadow-sm"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  maxDate={new Date()}
                /> */}
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
                  Confirm
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
