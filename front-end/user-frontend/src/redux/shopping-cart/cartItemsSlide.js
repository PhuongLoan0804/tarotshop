import { createSlice } from "@reduxjs/toolkit"

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []

const initialState = {
  value: items,
}

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload
      const duplicate = state.value.filter((e) => e.id === newItem.id)

      // console.log(state)
      // console.log(action)

      if (duplicate.length > 0) {
        state.value = state.value.filter((e) => e.id !== newItem.id)
        state.value = [
          ...state.value,
          {
            id: duplicate[0].id,
            categorySlug: newItem.categorySlug,
            price: newItem.price,
            quantity: newItem.quantity + duplicate[0].quantity,
          },
        ]
      } else {
        state.value = [
          ...state.value,
          {
            ...action.payload,
          },
        ]
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      )
    },
    updateItem: (state, action) => {
      const newItem = action.payload
      const item = state.value.filter((e) => e.id === newItem.id)
      if (item.length > 0) {
        state.value = state.value.filter((e) => e.id !== newItem.id)
        state.value = [
          ...state.value,
          {
            id: item[0].id,
            CategorySlug: newItem.CategorySlug,
            price: newItem.price,
            quantity: newItem.quantity,
          },
        ]
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      )
    },
    removeItem: (state, action) => {
      const item = action.payload
      state.value = state.value.filter((e) => e.id !== item.id)
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      )
    },
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateItem } = cartItemsSlice.actions

export default cartItemsSlice.reducer
