import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupNumber: "",
  departureDate: "",
  availableSeat: 0,
  tourSubject: "",
  priceTable: [{ TOURPACKAGE_GROUPPRICE_roomAvailable: 0 }],
  price: {
    adult: 0,
    kid: 0,
    infant: 0,
  },
  form: {
    registrar: {
      country: "Taiwan",
      phoneCode: "+886",
    },
    traveler: [],
    rooms: [],
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
        TOURPACKAGE_SALSEPRICE_D_StandardPrice_1_,
        TOURPACKAGE_SALSEPRICE_D_StandardPrice_2_,
        TOURPACKAGE_SALSEPRICE_D_StandardPrice_3_,
      } = action.payload;
      state.groupNumber = groupNumber;
      state.departureDate = departureDate;
      state.availableSeat = seat_available;
      state.tourSubject = tourSubject;
      state.price.adult = TOURPACKAGE_SALSEPRICE_D_StandardPrice_1_;
      state.price.kid = TOURPACKAGE_SALSEPRICE_D_StandardPrice_2_;
      state.price.infant = TOURPACKAGE_SALSEPRICE_D_StandardPrice_3_;
    },
    setPriceTable: (state, action) => {
      const { priceTable_group } = action.payload;
      state.priceTable = priceTable_group;
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
        case "phoneCode":
          state.form.registrar = { ...state.form.registrar, phoneCode: value };
          break;
        case "mobile":
          state.form.registrar = { ...state.form.registrar, mobile: value };
          break;
        case "address":
          state.form.registrar = { ...state.form.registrar, address: value };
          break;
        default:
          break;
      }
    },
    setTraveler: (state, action) => {
      state.form.traveler.push(action.payload);
    },
  },
});

export const { setForm, setRegistrar, setTraveler, setPriceTable } =
  formSlice.actions;
export default formSlice.reducer;
