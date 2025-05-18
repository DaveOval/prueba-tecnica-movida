import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isAsideOpen: boolean;
  isModalOpen: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
}

const initialState: UiState = {
  isAsideOpen: false,
  isModalOpen: false,
  theme: 'light',
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleAside(state) {
      state.isAsideOpen = !state.isAsideOpen;
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { toggleAside, openModal, closeModal, setTheme, setLoading } =
  uiSlice.actions;

export default uiSlice.reducer;
