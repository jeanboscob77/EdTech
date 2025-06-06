"use client";
import { Provider } from "react-redux";
import { store } from "./Store";
import { ReduxProviderProps } from "../types";

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
