import { SET_BET } from "../constant";

const initialState = {
  isBetPlaced: false, // Store a boolean state
};

export const betReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BET:
      return { ...state, isBetPlaced: action.payload }; // Update boolean value

    default:
      return state;
  }
};