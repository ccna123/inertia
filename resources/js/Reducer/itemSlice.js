import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalOrderInCart: 0,
    totalCost: 0,
};

export const updateTotalOrderInCart = createSlice({
    name: "itemSlice/updateTotalOrderInCart",
    initialState,
    reducers: {
        getTotalOrderInCart: () => {
            return state;
        },
        decreaseTotalOrder: (state) => {
            state.totalOrderInCart -= 1;
        },
        increaseTotalOrder: (state) => {
            state.totalOrderInCart += 1;
        },
    },
});

export const { getTotalOrderInCart, increaseTotalOrder, decreaseTotalOrder } =
    updateTotalOrderInCart.actions;
export default updateTotalOrderInCart.reducer;
