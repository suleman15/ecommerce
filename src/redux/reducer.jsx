import { combineReducers } from "@reduxjs/toolkit";
import user from "./userSlice";
import tab from "./tabSlice";

const rootReducer = combineReducers({ tab, user });

export default rootReducer;
