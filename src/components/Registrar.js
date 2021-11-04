import { setRegistrar, setRoom } from "../store/form";
import { useDispatch, useSelector } from "react-redux";
import { country } from "../store/country";
import { forwardRef, useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Room } from "./Room";

function Registrar() {
  const storeForm = useSelector((state) => state.form.form);
  const registrarFormRef = useRef(null);
  const rooms = useSelector((state) => state.form.form.room);
  const availableRoom = useSelector((state) => {
    const currPriceTable = state.form.priceTable;
    const x = currPriceTable.reduce(
      (prev, curr) => prev + curr.TOURPACKAGE_GROUPPRICE_roomAvailable,
      0
    );
    return x;
  });
  const [roomLeft, setRoomLeft] = useState(0);
  const limit = useSelector((state) => state.form.availableSeat);
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  // const [isOpen, setIsOpen] = useState(true);
  const childRef = useRef();

  const onChangeInput = (input, e) => {
    dispatch(setRegistrar({ input: input, value: e }));
    if (input === "country") {
      const tempCountry = country.filter((state) => state.country === e);
      const phoneCode = tempCountry[0].phoneCode;
      dispatch(setRegistrar({ input: "phoneCode", value: phoneCode }));
    }
  };

  const triggerHandleAddRoom = () => {
    registrarFormRef.current.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );
  };

  const handleAddRoom = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      // setIsOpen(false);
    } else {
      event.preventDefault();
      event.stopPropagation();
      // add room if any available room
      // if (roomLeft > 0) {
      //   setRoomLeft(roomLeft - 1);
      // } else {
      //   alert("No more available room");
      // }
      // setIsOpen(true);
      // dispatch(setRoom());
      // childRef.current.callFromParent();
    }
    setValidated(true);
  };

  useEffect(() => {
    setRoomLeft(availableRoom);
  }, [availableRoom]);

  return (
    <div className="registrar">
      <h3 className="text-center mb-4 mt-3">訂購人</h3>
      <Form
        className="row g-3 needs-validation"
        id="registrarId"
        noValidate
        validated={validated}
        onSubmit={handleAddRoom}
        ref={registrarFormRef}
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
        {/* <div className="col-md-6">
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
        </div> */}
        <div className="col-sm-12">
          <label htmlFor="validationCustom04" className="form-label">
            聯絡電話/ Contact Number
          </label>
          <div className="input-group">
            {/* <span className="input-group-text" id="basic-addon1">
              
            </span> */}
            <input
              type="text"
              className="form-control shadow-sm w-25"
              aria-label="phoneNumber"
              aria-describedby="basic-addon1"
              onChange={(e) => onChangeInput("phoneCode", e.target.value)}
              required
              defaultValue={storeForm.registrar.phoneCode}
              // value={storeForm.registrar.phoneCode}
            />
            <input
              type="number"
              className="form-control shadow-sm w-75"
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

        {rooms.map((room, index) => (
          <Room
            key={index}
            indexNo={index}
            triggerHandleAddRoom={triggerHandleAddRoom}
          />
        ))}
      </Form>
    </div>
  );
}

export default forwardRef(Registrar);
