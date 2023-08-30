import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  toggleModal: true,
  comments: {},
};

const applicationSlice = createSlice({
  name: "ApplicationSlice",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
    toggleModal: (state, action) => {
      state.toggleModal = !action.payload;
    },
    addComments: (state, action) => {
      //   state.comments.data = [...state.comments.data, action.payload];
      const { articleId, comment } = action.payload;
      if (!state.comments[articleId]) {
        state.comments[articleId] = [];
      }
      state.comments[articleId].push(comment);
    },
  },
});

export const { updateName, addComments } = applicationSlice.actions;

export default applicationSlice.reducer;
