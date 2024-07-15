import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    selectedItem: null,
    detectionArea: { x: 0, y: 0, width: 100, height: 100 },
    darkMode: false,
    notificationsEnabled: true,
    detectionThreshold: 0.5,
  },
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    saveDetectionArea: (state, action) => {
      state.detectionArea = action.payload;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setNotificationsEnabled: (state, action) => {
      state.notificationsEnabled = action.payload;
    },
    setDetectionThreshold: (state, action) => {
      state.detectionThreshold = action.payload;
    },
  },
});

export const {
  setSelectedItem,
  saveDetectionArea,
  setDarkMode,
  setNotificationsEnabled,
  setDetectionThreshold
} = settingsSlice.actions;

export const selectSelectedItem = (state) => state.settings.selectedItem;
export const selectDetectionArea = (state) => state.settings.detectionArea;
export const selectDarkMode = (state) => state.settings.darkMode;
export const selectNotificationsEnabled = (state) => state.settings.notificationsEnabled;
export const selectDetectionThreshold = (state) => state.settings.detectionThreshold;

export default settingsSlice.reducer;