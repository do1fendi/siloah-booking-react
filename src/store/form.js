import { createSlice } from "@reduxjs/toolkit";

const initialState = {  
  groupNumber: "",
  departureDate: "",
  availableSeat: 0,
  tourSubject: "",
  deposit: 0,
  priceTable: [
    { TOURPACKAGE_GROUPPRICE_roomAvailable: 0 },
    { TOURPACKAGE_GROUPPRICE_roomAvailable: 0 },
  ],
  price: {
    adult: 0,
    kid: 0,
    infant: 0,
  },
  roomOccupancyTable: [],
  form: {
    orderFromType:"WEB",
    groupNumber: "",
    totalPrice: 0,
    totalDeposit: 0,
    invBuyer: "",
    invUid: "",
    invRemark: "",
    registrar: {
      // country: "Taiwan",
      // phoneCode: "+886",
      phone: "",
    },
    room: [{}],
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setForm: (state, action) => {
      const {
        groupNumber,
        departureDate,
        seat_available,
        tourSubject,
        deposit,
        TOURPACKAGE_SALSEPRICE_D_StandardPrice_1_,
        TOURPACKAGE_SALSEPRICE_D_StandardPrice_2_,
        TOURPACKAGE_SALSEPRICE_D_StandardPrice_3_,
      } = action.payload;
      state.groupNumber = groupNumber;
      state.form.groupNumber = groupNumber;
      state.departureDate = departureDate;
      state.availableSeat = seat_available;
      state.tourSubject = tourSubject;
      state.deposit = deposit;
      state.price.adult = TOURPACKAGE_SALSEPRICE_D_StandardPrice_1_;
      state.price.kid = TOURPACKAGE_SALSEPRICE_D_StandardPrice_2_;
      state.price.infant = TOURPACKAGE_SALSEPRICE_D_StandardPrice_3_;
    },
    setPriceTable: (state, action) => {
      const { priceTable_group } = action.payload;
      state.priceTable = priceTable_group;
      state.roomOccupancyTable = priceTable_group;
    },
    updateRoomTable: (state, action) => {
      const { indexPrevious, index } = action.payload;
      if (indexPrevious == null && index != null) {
        state.roomOccupancyTable[index][
          "TOURPACKAGE_GROUPPRICE_roomAvailable"
        ] =
          state.roomOccupancyTable[index][
            "TOURPACKAGE_GROUPPRICE_roomAvailable"
          ] - 1;
      } else if (indexPrevious != null && index != null) {
        state.roomOccupancyTable[indexPrevious][
          "TOURPACKAGE_GROUPPRICE_roomAvailable"
        ] =
          state.roomOccupancyTable[indexPrevious][
            "TOURPACKAGE_GROUPPRICE_roomAvailable"
          ] + 1;

        state.roomOccupancyTable[index][
          "TOURPACKAGE_GROUPPRICE_roomAvailable"
        ] =
          state.roomOccupancyTable[index][
            "TOURPACKAGE_GROUPPRICE_roomAvailable"
          ] - 1;
      } else {
        state.roomOccupancyTable[indexPrevious][
          "TOURPACKAGE_GROUPPRICE_roomAvailable"
        ] =
          state.roomOccupancyTable[indexPrevious][
            "TOURPACKAGE_GROUPPRICE_roomAvailable"
          ] + 1;
      }

      // if (indexPrevious != null) {
      //   state.roomOccupancyTable[indexPrevious][
      //     "TOURPACKAGE_GROUPPRICE_roomAvailable"
      //   ] =
      //     state.roomOccupancyTable[indexPrevious][
      //       "TOURPACKAGE_GROUPPRICE_roomAvailable"
      //     ] + 1;
      // }
      // state.roomOccupancyTable[index][
      //   "TOURPACKAGE_GROUPPRICE_roomAvailable"
      // ] =
      //   state.roomOccupancyTable[index][
      //     "TOURPACKAGE_GROUPPRICE_roomAvailable"
      //   ] - 1;
      // const index = state.roomOccupancyTable.findIndex((item)=>item.TOURPACKAGE_GROUPPRICE_roomTypeName == action.payload)
    },
    setRegistrar: (state, action) => {
      const { input, value } = action.payload;
      switch (input) {
        case "fn":
          state.form.registrar = { ...state.form.registrar, firstName: value };
          break;
        case "ln":
          state.form.registrar = { ...state.form.registrar, lastName: value };
          break;
        case "email":
          state.form.registrar = { ...state.form.registrar, email: value };
          break;
        case "country":
          state.form.registrar = { ...state.form.registrar, country: value };
          break;
        case "phone":
          state.form.registrar = { ...state.form.registrar, phone: value };
          break;
        // case "mobile":
        //   state.form.registrar = { ...state.form.registrar, mobile: value };
        //   break;
        case "address":
          state.form.registrar = { ...state.form.registrar, address: value };
          break;
        default:
          break;
      }
    },
    setTraveler: (state, action) => {
      const { index, traveler } = action.payload;
      if (!state.form.room[index].traveler) {
        state.form.room[index].traveler = [];
      }
      state.form.room[index].traveler.push(traveler);
      state.form.room[index].occupancy = state.form.room[index].occupancy + 1;
    },
    clearTraveler: (state, action) => {
      const { index } = action.payload;
      if (state.form.room[index].traveler) state.form.room[index].traveler = [];
    },
    setRoom: (state) => {
      state.form.room.push({});
    },
    updateRoomForm: (state, action) => {
      const { index, roomType } = action.payload;
      if (!state.form.room[index].traveler) {
        state.form.room[index].traveler = [];
      }
      state.form.room[index].roomType = roomType;
      state.form.room[index].occupancy = 0;
    },
    setTotalPrice: (state, action) => {
      state.form.totalPrice = action.payload;
    },
    setTotalDeposit: (state, action) => {
      state.form.totalDeposit = action.payload;
    },
    setReceipt: (state, action) => {
      const { input, value } = action.payload;
      switch (input) {
        case "invBuyer":
          state.form.invBuyer = value;
          break;
        case "invUid":
          state.form.invUid = value;
          break;
        case "invRemark":
          state.form.invRemark = value;
          break;

        default:
          break;
      }
    },
  },
});

export const {
  setForm,
  updateRoomForm,
  clearTraveler,
  setRegistrar,
  setTraveler,
  setPriceTable,
  setRoom,
  updateRoomTable,
  setTotalPrice,
  setTotalDeposit,
  setReceipt,
} = formSlice.actions;
export default formSlice.reducer;
