import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import App from "./App";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate
      loading={
        <div className='h-screen w-screen flex justify-center items-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-800'></div>
        </div>
      }
      persistor={persistor}
    >
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
