import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { PhotosContextProvider } from "./contexts/PhotoContext";

ReactDOM.render(
  <PhotosContextProvider>
    <App />
  </PhotosContextProvider>,
  document.getElementById("root")
);
