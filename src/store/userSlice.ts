import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: number;
  userAvatar: string;
};

type initialState = User[];

const initialState: initialState = [];

const userSlice = createSlice({
  name: 'userAvatar',
  initialState,
  reducers: {
    setAvatar: (state, { payload }: PayloadAction<User>) => {
      const userIndex = state.findIndex((user) => user.id === payload.id);

      if (userIndex !== -1) {
        state[userIndex].userAvatar = payload.userAvatar;
      } else {
        state.push(payload);
      }
    },
  },
});

export const { setAvatar } = userSlice.actions;
export default userSlice.reducer;
