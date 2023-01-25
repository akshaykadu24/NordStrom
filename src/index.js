import React from "react";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./Components/Products/redux/store";
import AuthContextProvider from "./Context/AuthContext/AuthContextProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <ChakraProvider>
    <AuthContextProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AuthContextProvider>
  </ChakraProvider>
);
