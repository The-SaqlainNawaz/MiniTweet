import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: {
    firstName: "John",
    lastName: "Doe",
  },
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = { firstName: "John", lastName: "Doe" };
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("No user exists");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
  },
  setPost: (state, action) => {
    const updatedPost = state.post.map((post) => {
      if (post._id === action.payload.post._id) {
        return action.payload.post;
      } else {
        return post;
      }
    });
    state.posts = updatedPost;
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
