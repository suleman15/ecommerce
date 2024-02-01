import { combineReducers } from "@reduxjs/toolkit";
import user from "./userSlice";
import tab from "./tabSlice";
import theme from "./themeSlice";

const rootReducer = combineReducers({ tab, user, theme });

export default rootReducer;
