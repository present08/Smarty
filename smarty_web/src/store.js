import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        // 다른 리듀서들도 여기에 추가할 수 있습니다
    },
});

export default store; 