// src/redux/slice/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  password: "",
  isProfileModalOpen: false,//openPasswordChange
  isEditProfileModalOpen: false,
  isPasswordChangeOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { firstName, lastName, phoneNumber, password } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.phoneNumber = phoneNumber;
      state.password = password;
    },
    resetUser: () => initialState,
    openProfileModal: (state) => {
      state.isProfileModalOpen = true;
    },
    closeProfileModal: (state) => {
      state.isProfileModalOpen = false;
    },
    openEditProfileModal: (state) => {
      state.isEditProfileModalOpen = true;
    },
    closeEditProfileModal: (state) => {
      state.isEditProfileModalOpen = false;
    },
    openPasswordChange: (state) => {
      state.isPasswordChangeOpen = true;
    },
    closePasswordChange: (state) => {
      state.isPasswordChangeOpen = false;
    },
  },
});

export const {
  setUserData,
  resetUser,
  openProfileModal,
  closeProfileModal,
  openEditProfileModal,
  closeEditProfileModal,
  openPasswordChange,
  closePasswordChange
} = userSlice.actions;
export default userSlice.reducer;
