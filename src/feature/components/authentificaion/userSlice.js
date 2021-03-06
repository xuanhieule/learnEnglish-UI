import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../../api/userApi";
import StorageKeys from "../../../constants/storage-key";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const register = createAsyncThunk("user/register", async (payload) => {
  // call api to register
  const data = await userApi.register(payload);

  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  //save data to cookies
  // cookies.set(StorageKeys.TOKEN,data.jwt,{ path: '/' });
  // cookies.set(StorageKeys.USER, JSON.stringify(data.user),{ path: '/' });

  //return user data

  return data.user;
});
export const login = createAsyncThunk("user/login", async (payload) => {
  // call api to login
  const data = await userApi.login(payload);

  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data));
  //save data to cookies
  // cookies.set(StorageKeys.TOKEN,data.email,{ path: '/' });
  // cookies.set(StorageKeys.USER, JSON.stringify(data.user),{ path: '/' });

  //return user data

  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    // current: cookies.get(StorageKeys.USER) || {},
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout(state){
      localStorage.remove(StorageKeys.USER);
      localStorage.remove(StorageKeys.TOKEN);
      state.current = {};

      //clear local storage
      // cookies.remove(StorageKeys.USER);
      // cookies.remove(StorageKeys.TOKEN);
      // state.current = {};
    }
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions,reducer } = userSlice;
export const {logout} = actions;
export default reducer;
