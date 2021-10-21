import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { ConfigProvider } from "@apisuite/fe-base";
import { createContext } from "react";
import { customContext } from "storeon/react";

import { API_URL } from "./constants/endpoints";
import { createBrowserHistory } from "history";
import App from "./App";
import ErrorMonitor from "./components/ErrorMonitor";
import translations from "./translations";
import { store } from "./store";

import "./app.scss";

export const history = createBrowserHistory();

const AppContext = createContext(store);
export const useStoreon = customContext(AppContext);

const render = (Component: React.ElementType) => {
  ReactDOM.render(
    <ErrorMonitor>
      <AppContext.Provider value={store}>
        <Router history={history}>
          <ConfigProvider api={{ base: API_URL }} translations={translations}>
            <Component />
          </ConfigProvider>
        </Router>
      </AppContext.Provider>
    </ErrorMonitor>,
    document.getElementById("root")
  );
};

render(App);
