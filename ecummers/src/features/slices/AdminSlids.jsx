// adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        totalEarnings: 0,
        totalSold: 0,
    },
    reducers: {
        recordSale: (state, action) => {
            state.totalEarnings += action.payload.totalEarnings;
            state.totalSold += action.payload.amountSold;
        },
    },
});

export const { recordSale } = adminSlice.actions;

export default adminSlice.reducer;