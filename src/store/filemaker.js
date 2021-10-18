import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  credential: "c3lzdGVtQXBpOiQ3cUxgU3kmOl45X10mJzI=",
  token: "",
};

export const filemakerSlice = createSlice({
  name: "filemaker",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

/* Handle Filemaker API */
// Get Token
export const getToken = async () => {
  const config = {
    method: "post",
    url: "https://ofc.taiwanviptravel.com/fmi/data/v1/databases/TVT/sessions",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${initialState.credential}`,
    },
    data: {},
  };
  const res = await axios(config);
  return res.data.response.token;
};

// Find
export const findRecord = async (gn, token) => {
  const query = {
    query: [
      {
        groupNumber: `==${gn}`,
      },
    ],
  };
  const config = {
    method: "post",
    url: "https://ofc.taiwanviptravel.com/fmi/data/v1/databases/TVT/layouts/DATA_API_TOURPACKAGE/_find",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: query,
  };
  const res = await axios(config);
  return res.data.response;
};

export const { setToken } = filemakerSlice.actions;
export default filemakerSlice.reducer;
