import { ProductInterface } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  catItems: ProductInterface[],
  cartTotal: number
}

export const cartSlice = createSlice({

  name: "cart",
  initialState: {
    cartItems: [],
    cartTotal: 0,
  } as CartState,
  reducers: {

    AddProductToCart: (
      state,
      action: {
        type: string,
        payload: ProductInterface
      }
    ) => {
      state.cartItems.push(action.payload);

    }
  }

})

export const {AddProductToCart} = cartSlice.actions;