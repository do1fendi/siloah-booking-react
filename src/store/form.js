import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupNumber: "",
  departureDate: "",
  availableSeat: "",
  tourSubject: "",
  price: {
    adult: 0,
    kid: 0,
    infant: 0,
  },
  registrar: {
    country:"Taiwan",
    phoneCode: "+886"
  },
  traveler: [],
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
    setRegistrar: (state, action) => {
      const { input, value } = action.payload;
      switch (input) {
        case "fn":
          state.registrar = { ...state.registrar, firstName: value };
          break;
        case "ln":
          state.registrar = { ...state.registrar, lastName: value };
          break;
        case "email":
          state.registrar = { ...state.registrar, email: value };
          break;
        case "country":
          state.registrar = { ...state.registrar, country: value };
          break;
        case "phoneCode":
          state.registrar = { ...state.registrar, phoneCode: value };
          break;
        case "mobile":
          state.registrar = { ...state.registrar, mobile: value };
          break;
        case "address":
          state.registrar = { ...state.registrar, address: value };
          break;
        default:
          break;
      }
    },
    setTraveler: (state, action) => {
      state.traveler.push(action.payload);
    },
  },
});

export const { setForm, setRegistrar } = formSlice.actions;
export default formSlice.reducer;
