import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupNumber: "",
  departureDate: "",
  availableSeat: "",
  tourSubject: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setForm: (state, action) => {
      const { groupNumber, departureDate, seat_available, tourSubject } =
        action.payload;
      state.groupNumber = groupNumber;
      state.departureDate = departureDate;
      state.availableSeat = seat_available;
      state.tourSubject = tourSubject;
    },
  },
});

export const { setForm } = formSlice.actions;
export default formSlice.reducer;
