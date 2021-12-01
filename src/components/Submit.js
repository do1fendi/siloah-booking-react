import { useSelector, useDispatch } from "react-redux";
import { setTotalPrice, setTotalDeposit } from "../store/form";
import { findRecord, getToken, setToken, store } from "../store/filemaker";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";

export const Submit = ({ setLoadingFromChild }) => {
  const [validated, setValidated] = useState(false);
  const [pay, setPay] = useState("deposit");
  const [payMethod, setPayMethod] = useState("");
  const formRef = useRef(null);
  const queryParams = new URLSearchParams(window.location.search);
  const curForm = useSelector((state) => state.form.form);
  const totalPrice = useSelector((state) => state.form.form.totalPrice);
  const totalDeposit = useSelector((state) => state.form.form.totalDeposit);
  const token = useSelector((state) => state.filemaker.token);
  const dispatch = useDispatch();
  // infant use infant price as the deposit, other use default deposit
  const defaultDeposit = useSelector((state) => state.form.deposit);
  const infantDeposit = useSelector((state) => {
    if (state.form.priceTable[0])
      return state.form.priceTable[0].TOURPACKAGE_GROUPPRICE_infant;
  });

  const depositList = useSelector((state) => {
    let totalPeople = 0;
    let totalInfant = 0;
    if (state.form.form.room) {
      state.form.form.room.forEach((room) => {
        if (room.traveler) {
          room.traveler.forEach((traveler) => {
            if (traveler.status === "adult") totalPeople++;
            if (traveler.status === "child") totalPeople++;
            if (traveler.status === "kid") totalPeople++;
            if (traveler.status === "infant") totalInfant++;
          });
        }
      });
    }
    return {
      people: totalPeople,
      infant: totalInfant,
    };
  });

  const calculateDeposit = (dt) => {
    const totalDeposit = dt.people * defaultDeposit + dt.infant * infantDeposit;
    return totalDeposit;
  };
  const calculatePrice = useSelector((state) => {
    if (state.form.form.room) {
      if (state.form.form.room[0].traveler) {
        if (state.form.form.room[0].traveler.length >= 1) {
          let total = 0;
          state.form.form.room.forEach((room) => {
            if (room.traveler) {
              let price = room.traveler.reduce((total, p) => {
                if (p.price) return total + p.price;
                else return total;
              }, 0);
              total = total + price;
            }
          });
          return total;
        }
      }
    }
  });

  // Compare original each type available room with current selected room
  // if any total selected room more than original available room, error is set
  // const originalData = useSelector((state) => state.form.priceTable);
  const currentData = useSelector((state) => state.form.form.room);

  const compareData = (originalData) => {
    if (currentData[0].roomType) {
      //calculate and populate current roomType like {單人房: 3, Villa: 1}
      var map = currentData.reduce(
        (cnt, cur) => ((cnt[cur.roomType] = cnt[cur.roomType] + 1 || 1), cnt),
        {}
      );
      // set array room type using object keys, like  ['單人房', 'Villa']
      const arrRoomType = Object.keys(map).filter((val) => val != "undefined");

      //compare each roomType in array arrRoomType with originalData
      //if any total room type selected larger than original roomType availble room, error is set
      let anyErr = 0;
      arrRoomType.forEach((type) => {
        let filterOriginalData = originalData.filter(
          (dt) => dt.TOURPACKAGE_GROUPPRICE_roomTypeName === type
        );
        // the comparison, i
        if (
          map[type] > filterOriginalData[0].TOURPACKAGE_GROUPPRICE_roomAvailable
        )
          anyErr += 1;
      });
      if (anyErr > 0) return true;
      else return false;
    }
  };

  useEffect(() => {
    calculatePrice
      ? dispatch(setTotalPrice(calculatePrice))
      : dispatch(setTotalPrice(0));
    calculateDeposit
      ? dispatch(setTotalDeposit(calculateDeposit(depositList)))
      : dispatch(setTotalDeposit(0));
  }, [calculatePrice, dispatch, calculateDeposit, depositList]);

  const onSubmit = (paymentMethod) => {
    setPayMethod(paymentMethod);
    setLoadingFromChild(true);
    /**  Get latest data from filemaker, then compare currentData with it */
    (async () => {
      //Get Filemaker Session Token
      const res = await getToken();
      //Save token to store
      dispatch(setToken(res));
      const result = await findRecord(queryParams.get("groupNumber"), res);

      const getCurrentData = JSON.parse(
        JSON.stringify(result.data[0].portalData).replaceAll(
          /(::)|[(]|[)]/g,
          "_"
        )
      );
      // to be continue, if err true alert error, if err false submit form to filemaker
      setLoadingFromChild(false);
      console.log(compareData(getCurrentData.priceTable_group));
      //check if traveler is set using totalPrice is more than 0
      if (totalPrice === 0) {
        alert("No Traveler is set");
      } else if (compareData(getCurrentData.priceTable_group)) {
        alert("Room is currently not available, please select another room");
      } else {
        triggerHandleSubmit();
      }
    })();
  };
  const handleSubmit = (event) => {
    setLoadingFromChild(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // store to filemaker
      (async () => {
        const result = await store(token, curForm);
        console.log(result);
        setLoadingFromChild(false);
        // if record stored, do payment
        if (result.recordId) {
          //***** Continue here */
          // payment by credit card
          if(payMethod === "credit"){
            window.location.replace(`https://node.taiwanviptravel.com/payment?recordId=${result.recordId}&pay=${pay}`)
          }
          else if (payMethod === "atm"){
            window.location.replace(`https://node.taiwanviptravel.com/payment/atm?recordId=${result.recordId}&pay=${pay}`)
          }
        } else {
          alert("record failed, please contact Siloah");
        }
      })();
    }

    setValidated(true);
  };

  const triggerHandleSubmit = () => {
    formRef.current.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );
  };
  return (
    <>
      <div className="submit mt-4 pt-4">
        <div className="container p-2 text-center">
          {/* <h4 className="text-wrap">
            Total Price: {JSON.stringify(totalPrice)}
          </h4>
          <h4 className="text-wrap">
            Total Deposit: {JSON.stringify(totalDeposit)}
          </h4> */}
          {depositList && depositList.people > 0 ? (
            <p>
              訂金 (
              {depositList.people > 0 ? (
                <span>
                  {" "}
                  {depositList.people} 人 *{" "}
                  {defaultDeposit
                    .toString()
                    .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")}
                </span>
              ) : (
                ""
              )}
              {depositList.infant > 0 ? (
                <span>
                  , {depositList.infant} 嬰兒 *{" "}
                  {infantDeposit
                    .toString()
                    .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")}{" "}
                </span>
              ) : (
                ""
              )}{" "}
              )
            </p>
          ) : (
            ""
          )}
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label={`全額付款 (台幣 $${totalPrice
                    .toString()
                    .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")})`}
                  name="group1"
                  type={type}
                  id={`inline-${type}-1`}
                  value="full"
                  onChange={(e) => setPay(e.target.value)}
                />
                <Form.Check
                  inline
                  defaultChecked
                  label={`先付訂金 (台幣 $${totalDeposit
                    .toString()
                    .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")})`}
                  name="group1"
                  type={type}
                  id={`inline-${type}-2`}
                  value="deposit"
                  onChange={(e) => setPay(e.target.value)}
                />
              </div>
            ))}
            <Form.Group className="mb-3 px-3">
              <Form.Check
                required
                inline
                label="* 我已閱讀上述報名須知及定型化契約，並同意接受其內容"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
          </Form>
          <div className="text-center">
            <button
              className="btn btn-warning m-1 btnPayment fw-bold"
              onClick={() => onSubmit("credit")}
            >
              線上刷卡
            </button>
            <button
              className="btn btn-warning m-1 btnPayment fw-bold"
              onClick={() => onSubmit("atm")}
            >
              匯款
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
