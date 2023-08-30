import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navigation from "./Components/Navigation.jsx";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import GetUserName from "./Components/modals/GetUserName.jsx";
import Settings from "./Pages/Settings.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navigation />}>
      <Route path="/" element={<App />} />

      <Route path="/settings" element={<Settings />} />
      <Route path="/about" />
      <Route path="/register" />
      <Route path="/signin" />
      <Route path="/home" />
      <Route path="/paystack" />
      <Route path="/lesson" />

      <Route path="*" />
      {/* ... etc. */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
