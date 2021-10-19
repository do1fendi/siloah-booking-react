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
    setTraveler: (state, action) => {
      state.traveler.push(action);
    },
  },
});

export const { setForm } = formSlice.actions;
export default formSlice.reducer;
