import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  activeFilter: string;
}

const initialState: IInitialState = {
  activeFilter: "All",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
  },
});

const { reducer, actions } = productsSlice;
export const { changeActiveFilter } = actions;

export default reducer;
