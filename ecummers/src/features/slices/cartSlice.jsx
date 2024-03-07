import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { recordSale } from './AdminSlids';

// Thunk for at håndtere checkout processen
export const processCheckout = createAsyncThunk(
    'cart/processCheckout',
    async (_, { getState, dispatch }) => {
        const { cart } = getState().cart;
        const totalItemsSold = cart.reduce((total, item) => total + item.amount, 0);
        const totalSalesValue = cart.reduce((total, item) => total + (item.price * item.amount), 0);

        // Antager at du køber varerne til $50 stykket og sælger dem til $100 stykket
        // RecordSale action bør tage højde for total antal solgte og indtjening
        dispatch(recordSale({
            amountSold: totalItemsSold,
            salePricePerItem: 100, // salgspris
            costPricePerItem: 50, // kostpris
            totalEarnings: totalSalesValue - (50 * totalItemsSold),

        }));

        // Returner de værdier der skal nulstilles i tilstanden
        return {
            totalAmount: 0,
            totalPrice: 0,
            cart: []
        };
    }
);

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        totalAmount: 0,
        totalPrice: 0,
    },
    reducers: {
        addToCart(state, action) {
            const newProduct = action.payload;
            const existingProductIndex = state.cart.findIndex(
                (product) => product.id === newProduct.id
            );

            if (existingProductIndex >= 0) {
                const existingProduct = state.cart[existingProductIndex];
                existingProduct.amount += 1;
                // Sikre at prisen tilføjes som et tal, ikke en streng
                existingProduct.totalPrice = parseFloat(existingProduct.totalPrice) + parseFloat(newProduct.price);
            } else {
                // Sikre at prisen sættes som et tal, ikke en streng
                state.cart.push({ ...newProduct, amount: 1, totalPrice: parseFloat(newProduct.price) });
            }

            state.totalAmount += 1;
            // Sikre at prisen tilføjes til den samlede pris som et tal
            state.totalPrice = parseFloat(state.totalPrice) + parseFloat(newProduct.price);
        },
        removeFromCart(state, action) {
            const { id } = action.payload;
            // Fjern size og color fra søgningen, da de ikke længere er relevante
            const existingProductIndex = state.cart.findIndex(
                (product) => product.id === id
            );

            if (existingProductIndex >= 0) {
                const existingProduct = state.cart[existingProductIndex];
                state.totalAmount -= existingProduct.amount;
                state.totalPrice -= existingProduct.totalPrice;
                state.cart.splice(existingProductIndex, 1);
            }
        },
        updateCartItemQuantity(state, action) {
            const { id, amount } = action.payload;
            const product = state.cart.find(product => product.id === id);
            if (product) {
                // Beregn først den samlede prisændring for produktet
                const priceDifference = (parseFloat(product.price) * amount) - product.totalPrice;
                // Opdater produktets antal og totalpris
                product.amount = amount;
                product.totalPrice = parseFloat(product.price) * amount;
                // Opdater den samlede pris for hele kurven
                state.totalPrice = parseFloat(state.totalPrice) + priceDifference;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(processCheckout.fulfilled, (state, action) => {
                state.cart = action.payload.cart;
                state.totalAmount = action.payload.totalAmount;
                state.totalPrice = action.payload.totalPrice;
            });
    }
});

// Exportér dine action creators og den asynkrone thunk
export const { addToCart, removeFromCart, updateCartItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;