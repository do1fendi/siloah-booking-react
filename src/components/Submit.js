import { useSelector, useDispatch } from "react-redux";
import { setTotalPrice } from "../store/form";
import { findRecord, getToken, setToken } from "../store/filemaker";
import { useEffect, useState } from "react";

export const Submit = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const [err, setError] = useState(0);
  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => {
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
    dispatch(setTotalPrice(totalPrice));
  }, [totalPrice, dispatch]);

  const onSubmit = () => {
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
      )
      // to be continue, if err true alert error, if err false submit form to filemaker
      console.log(compareData(getCurrentData.priceTable_group));
    })();
  };
  return (
    <div className="submit mt-4">
      <div className="container p-2">
        <h4>Total Price: {totalPrice ? totalPrice : 0}</h4>
        <button onClick={() => onSubmit()}></button>
      </div>
      <p className="text-wrap">{err}</p>
    </div>
  );
};
