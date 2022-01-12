import { createSlice } from '@reduxjs/toolkit';

export interface ConfigurationState {
  test: string;
}

const initialState: ConfigurationState = {
  test: 'lorem ipsum sit dolor amet',
};

export const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {},
});

export const { actions: configurationActions, reducer: configurationReducer } = configurationSlice;
