import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { Button, Modal, Form, Badge } from "react-bootstrap";
// import { country } from "../store/country";
import { useDispatch, useSelector } from "react-redux";
import { setTraveler } from "../store/form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ageCalculate } from "../store/ageCalculate";
import * as Icon from "react-bootstrap-icons";

export const Traveler = forwardRef(
  (
    {
      modal,
      travelerSet,
      indexNo,
      isKid,
      isAnyKidInRoomWithBed,
      roomMaxOccupancy,
    },
    ref
  ) => {
    const storeForm = useSelector((state) => state.form);
    //set price table
    const priceTable = useSelector((state) => state.form.priceTable);
    const currRoomType = storeForm.form.room[indexNo].roomType;
    const filteredTable = priceTable.filter(
      (arr) => arr.TOURPACKAGE_GROUPPRICE_roomTypeName === currRoomType
    );
    const formRef = useRef();
    // check if current room has traveler
    const isTravelerSet = useSelector((state) => {
      if (state.form.form.room[indexNo].traveler) {
        if (state.form.form.room[indexNo].traveler.length > 0) {
          // if (state.form.form.room[indexNo].traveler.length >= roomMaxOccupancy)
          //   setIsStillHasBed(false);
          return true;
        }
      } else return false;
    });
    // check if current room still has bed, so can set a bed for kid
    const isStillHasBed = useSelector((state) => {
      if (state.form.form.room[indexNo].traveler) {
        if (state.form.form.room[indexNo].traveler.length >= roomMaxOccupancy) {
          return false;
        } else return true;
      } else return true;
    });

    // console.log(isKid);
    const [showKidBed, setShowKidBed] = useState(false);
    const [startDate, setStartDate] = useState(undefined);
    const [travelerForm, setTravelerForm] = useState({
      lastName: "",
      firstName: "",
      gender: "male",
      email: "",
      country: "Taiwan",
      phoneCode: "+886",
      mobile: "",
      dob: "",
      citizenId: "",
      status: "",
      kidWithBed: false,
      remark: "",
      price: 0,
    });
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const range = (start, end, length = end - start + 1) =>
      Array.from({ length }, (_, i) => start + i);
    const years = range(1931, new Date().getFullYear() + 1);
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
      // Clear form traveler on open
      setStartDate(undefined);
      setShowKidBed(false);
      setTravelerForm({
        lastName: "",
        firstName: "",
        gender: "male",
        email: "",
        country: "Taiwan",
        phoneCode: "+886",
        mobile: "",
        citizenId: "",
        dob: "",
        status: "",
        kidWithBed: false,
        remark: "",
        price: 0,
      });
      // console.log(priceTable);
      modal ? setShow(true) : setShow(false);

      if (storeForm.form.room[indexNo].traveler) {
        if (
          storeForm.form.room[indexNo].traveler.length >=
          storeForm.availableSeat
        ) {
          alert("Limit seat exceeded");
          setShow(false);
        }
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
        dispatch(setTraveler({ index: indexNo, traveler: travelerForm }));
        handleClose();
      }
      setValidated(true);
    };

    const onChangeInput = (input, e) => {
      switch (input) {
        // case "country":
        //   const tempCountry = country.filter((state) => state.country === e);
        //   setTravelerForm({
        //     ...travelerForm,
        //     phoneCode: tempCountry[0].phoneCode,
        //   });
        //   break;
        case "lastName":
          setTravelerForm({ ...travelerForm, lastName: e });
          break;
        case "firstName":
          setTravelerForm({ ...travelerForm, firstName: e });
          break;
        case "gender":
          setTravelerForm({ ...travelerForm, gender: e });
          break;
        case "email":
          setTravelerForm({ ...travelerForm, email: e });
          break;
        // case "country":
        //   setTravelerForm({ ...travelerForm, country: e });
        //   break;
        case "phoneCode":
          setTravelerForm({ ...travelerForm, phoneCode: e });
          break;
        case "mobile":
          setTravelerForm({ ...travelerForm, mobile: e });
          break;
        case "kidWithBed":
          // if kid with bed use child price else use original price
          if (e) {
            setTravelerForm({
              ...travelerForm,
              price: filteredTable[0].TOURPACKAGE_GROUPPRICE_child,
              kidWithBed: true,
            });
          } else {
            if (travelerForm.status === "kid")
              setTravelerForm({
                ...travelerForm,
                price: filteredTable[0].TOURPACKAGE_GROUPPRICE_kid,
                kidWithBed: false,
              });
            else
              setTravelerForm({
                ...travelerForm,
                price: filteredTable[0].TOURPACKAGE_GROUPPRICE_infant,
                kidWithBed: false,
              });
          }

          break;
        case "dob":
          setStartDate(e);
          const month = (e.getMonth() + 1).toString().padStart(2, "0");
          const year = e.getFullYear();
          const day = e.getDate();
          const combined = `${month}/${day}/${year}`;
          // set status age
          const status = ageCalculate(combined, storeForm.departureDate);
          // youngChild is status kid or infant
          let youngChild = false;
          if (status === "kid" || status === "infant") youngChild = true;

          // if youngChild setShow
          if (isStillHasBed && youngChild) setShowKidBed(true);
          else setShowKidBed(false);

          //firs traveler set should be an adult
          // if (indexNo === 0 && !isTravelerSet && status !== "adult") {
          if (!isTravelerSet && status !== "adult") {
            alert("First Traveler should be an Adult");
            setShowKidBed(false);
            setStartDate(undefined);
          } else if (isKid && !youngChild) {
            alert("Can only add kid with age < 7 years old");
            setStartDate(undefined);
          } /*else if (youngChild && isAnyKidInRoom) {
            alert("Only one kid allowed in a room");
            setStartDate(undefined);
          } else if (isKid && youngChild && !isStillHasBed && isAnyKidInRoomWithBed) {
            alert("Can only add kid with age < 7 years old");
            setStartDate(undefined);
          } */ else {
            // Set Price'
            let price = 0;
            switch (status) {
              case "adult":
                price = filteredTable[0].TOURPACKAGE_GROUPPRICE_adult;
                break;
              case "child":
                price = filteredTable[0].TOURPACKAGE_GROUPPRICE_child;
                break;
              case "kid":
                price = filteredTable[0].TOURPACKAGE_GROUPPRICE_kid;
                break;
              case "infant":
                price = filteredTable[0].TOURPACKAGE_GROUPPRICE_infant;
                break;
              default:
                break;
            }
            setTravelerForm({
              ...travelerForm,
              dob: combined,
              status: status,
              price: price,
            });
          }

          break;
        case "citizenId":
          setTravelerForm({ ...travelerForm, citizenId: e });
          break;
        case "remark":
          setTravelerForm({ ...travelerForm, remark: e });
          break;

        default:
          break;
      }
    };
    const copyRegistrarToTraveler = () => {
      setTravelerForm({
        ...travelerForm,
        firstName: storeForm.form.registrar.firstName,
        lastName: storeForm.form.registrar.lastName,
        email: storeForm.form.registrar.email,
        country: storeForm.form.registrar.country,
        phoneCode: storeForm.form.registrar.phoneCode,
        mobile: storeForm.form.registrar.mobile,
      });
    };
    const disableKeyboard = (e) => {
      e.preventDefault();
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
            <Modal.Title>
              旅客 ({storeForm.form.room[indexNo].roomType})
            </Modal.Title>
            {indexNo === 0 && !isTravelerSet ? (
              <Button
                variant="outline-info"
                onClick={() => copyRegistrarToTraveler()}
              >
                與訂購人相同
              </Button>
            ) : (
              ""
            )}
            {isKid ? <Badge bg="info">Kid Only</Badge> : ""}
          </Modal.Header>
          <Modal.Body>
            <>
              <Form
                className="row g-3"
                noValidate
                validated={validated}
                ref={formRef}
                onSubmit={handleTraveler}
              >
                <div className="col-6 col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">
                    姓氏/ Last name
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    id="validationCustom02"
                    onChange={(e) => onChangeInput("lastName", e.target.value)}
                    required
                    value={travelerForm.lastName}
                  />
                </div>
                <div className="col-6 col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    名字/ First name
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    id="validationCustom01"
                    onChange={(e) => onChangeInput("firstName", e.target.value)}
                    required
                    value={travelerForm.firstName}
                  />
                </div>
                <div className="col-6 col-md-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    生別/ Gender
                  </label>
                  <select
                    className="form-select shadow-sm"
                    id="validationCustom04"
                    // defaultValue="male"
                    onChange={(e) => onChangeInput("gender", e.target.value)}
                    required
                    value={travelerForm.gender}
                  >
                    <option value="male">男</option>
                    <option value="female">女</option>
                  </select>
                </div>
                {/* <div className="col-md-6">
                <label htmlFor="validationCustom04" className="form-label">
                  國家/ Country
                </label>
                <select
                  className="form-select shadow-sm"
                  id="validationCustom04"
                  // defaultValue={travelerForm.country}
                  onChange={(e) => onChangeInput("country", e.target.value)}
                  required
                  value={travelerForm.country}
                >
                  {country.map((e, key) => {
                    return (
                      <option key={key} value={e.country}>
                        {e.country}
                      </option>
                    );
                  })}
                </select>
              </div> */}

                {/* <div className="col-md-6">
                <label htmlFor="validationCustom02" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control shadow-sm"
                  id="validationCustom02"
                  onChange={(e) => onChangeInput("email", e.target.value)}
                  required
                  value={travelerForm.email}
                />
              </div> */}
                <div className="col-6 col-md-6">
                  <label htmlFor="validationCustom02" className="form-label">
                    生日/ Date of Birth
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
                          margin: 2,
                          gap: 5,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                          className="btn px-1"
                        >
                          {<Icon.ArrowLeftCircle color={"white"} size={24} />}
                        </button>
                        <select
                          value={date.getFullYear()}
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
                          className="rounded p-1 px-3"
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
                          className="rounded"
                        >
                          {months.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                          className="btn px-1"
                        >
                          {<Icon.ArrowRightCircle color={"white"} size={24} />}
                        </button>
                      </div>
                    )}
                    dateFormat="MM/dd/yyyy"
                    selected={startDate}
                    maxDate={new Date() - 1}
                    required
                    onChange={(e) => onChangeInput("dob", e)}
                    onKeyDown={e => e.preventDefault()}
                    readonly
                    withPortal
                  />
                </div>
                {showKidBed ? (
                  <div className="col-md-12">
                    <label htmlFor="validationCustom02" className="form-label">
                      Set Bed
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="invalidCheck"
                        onChange={(e) =>
                          onChangeInput("kidWithBed", e.target.checked)
                        }
                      />
                      <label className="">With Bed</label>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="col-md-12">
                  <label htmlFor="validationCustom02" className="form-label">
                    身份證/ Id
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    id="validationCustom02"
                    onChange={(e) => onChangeInput("citizenId", e.target.value)}
                    required
                  />
                </div>
                <div className="border-top pt-2">
                  <Badge>選填資料</Badge>
                </div>
                <div className="col-md-12">
                  <label htmlFor="validationCustom02" className="form-label">
                    其他特殊要求/ Remark
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    id="validationCustom02"
                    onChange={(e) => onChangeInput("remark", e.target.value)}
                  />
                </div>
                <div className="col-sm-12">
                  <label htmlFor="validationCustom04" className="form-label">
                    聯絡電話/ Contact Number
                  </label>
                  <div className="input-group">
                    {/* <span className="input-group-text" id="basic-addon1">
                    {travelerForm.phoneCode}
                  </span> */}
                    <input
                      type="text"
                      className="form-control shadow-sm w-25 text-center"
                      aria-label="phoneNumber"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        onChangeInput("phoneCode", e.target.value)
                      }
                      defaultValue="+886"
                      // value={storeForm.registrar.phoneCode}
                    />
                    <input
                      type="number"
                      className="form-control shadow-sm w-75"
                      aria-label="phoneNumber"
                      aria-describedby="basic-addon1"
                      onChange={(e) => onChangeInput("mobile", e.target.value)}
                      value={travelerForm.mobile}
                    />
                  </div>
                </div>

                <h4>Price: {travelerForm.price} NTD</h4>
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
  }
);
