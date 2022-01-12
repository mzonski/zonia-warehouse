import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppState } from '@redux/app-state';
import { appStore } from '@redux/app-store';
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from 'redux';

export type AppThunk = ThunkAction<void, AppState, null, Action<string>>;
export type ThunkAppDispatch = ThunkDispatch<AppState, void, Action>;

export type AppDispatch = typeof appStore.dispatch;
export const useAppDispatch = () => useDispatch<ThunkAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
