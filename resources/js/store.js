import { configureStore } from "@reduxjs/toolkit";
import updateTotalOrderInCartReducer from "./Reducer/itemSlice";

export const store = configureStore({
    reducer: {
        updateTotalOrderInCart: updateTotalOrderInCartReducer,
    },
});
