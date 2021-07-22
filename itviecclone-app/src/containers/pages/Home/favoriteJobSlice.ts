import { createSlice } from "@reduxjs/toolkit";
import Job from "../../../types/Job";

interface JobState {
  isShow: boolean;
  favoriteList: Job[];
}
const favoriteList = JSON.parse(localStorage.getItem("favoriteList") as string);
const initialState: JobState = {
  isShow: false,
  favoriteList,
};

export const favoriteSlice = createSlice({
  name: "favoritePosts",
  initialState,
  reducers: {
    showMiniPopUp(state) {
      state.isShow = true;
    },
    hideMiniPopUp(state) {
      state.isShow = false;
    },
    addFavoriteList(state, action) {
      const newItem = action.payload;
      const index = state.favoriteList.findIndex((x) => x.id === newItem.id);
      if (index >= 0) {
        const idNeedToRemove = newItem.id;
        state.favoriteList = state.favoriteList.filter(
          (x) => x.id !== idNeedToRemove
        );
        localStorage.setItem(
          "favoriteList",
          JSON.stringify(state.favoriteList)
        );
      } else {
        console.log("push new item");
        state.favoriteList.push(newItem);
        //save to localStorage
        const favoriteList =
          JSON.parse(localStorage.getItem("favoriteList") as string) || [];
        favoriteList.push(newItem);
        localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
      }
    },
    removeFavoriteList(state, action) {
      const idNeedToRemove = action.payload;
      state.favoriteList = state.favoriteList.filter(
        (x) => x.id !== idNeedToRemove
      );
      localStorage.setItem("favoriteList", JSON.stringify(state.favoriteList));
    },
  },
});

const { actions, reducer } = favoriteSlice;
export const {
  showMiniPopUp,
  hideMiniPopUp,
  addFavoriteList,
  removeFavoriteList,
} = actions;
export default reducer;
